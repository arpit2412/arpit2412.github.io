export const meta = {
  name: 'mind-world-assets',
  description: 'Generate Mind World assets, gating every step behind an adversarial design audit',
  whenToUse: 'After Higgsfield credits are purchased. Never run on a zero balance.',
  phases: [
    { title: 'Preflight', detail: 'verify balance and model access before spending' },
    { title: 'Hub still', detail: 'the one image the whole build rests on; audit until PASS' },
    { title: 'Room stills', detail: 'five rooms + descent + core, each audited' },
    { title: 'Motion', detail: 'dives then connectors, each audited' },
  ],
}

// ---------------------------------------------------------------------------
// SPEND CAP. The workflow is authorised for at most this many credits. Every
// generation is preflighted with get_cost and deducted here. If a generation
// would cross the cap, the workflow STOPS and reports rather than spending.
//
//   premium base = 188 cr   (docs/mind-world-spec.pdf §9.4)
//   2x rerolls   = 376 cr
// ---------------------------------------------------------------------------
const SPEND_CAP = 400
let spent = 0
const charge = (n, what) => {
  if (spent + n > SPEND_CAP) throw new Error(`SPEND CAP: ${what} (+${n}) would exceed ${SPEND_CAP} (spent ${spent})`)
  spent += n
  log(`  spent ${spent}/${SPEND_CAP} cr`)
}

const AUDIT = {
  type: 'object',
  required: ['verdict', 'defects', 'oneChange'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'REVISE'] },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    defects: { type: 'array', items: { type: 'string' } },
    oneChange: { type: 'string' },
    promptDelta: { type: 'string' },
  },
}

const GEN = {
  type: 'object',
  required: ['ok'],
  properties: {
    ok: { type: 'boolean' },
    path: { type: 'string' },
    jobId: { type: 'string' },
    credits: { type: 'number' },
    error: { type: 'string' },
  },
}

// ---------------------------------------------------------------------------
// Preflight. Two things must be true before a single credit is spent:
//   1. balance > 0
//   2. cinematic_studio_video_v2 is actually unlocked on this plan
// The second is the open risk from the spec — Starter grants only "selected models".
// ---------------------------------------------------------------------------
phase('Preflight')
const pre = await agent(
  `Use the Higgsfield MCP (ToolSearch for mcp__claude_ai_Higgsfield__*).
   1. Call balance. Report credits and plan.
   2. Call generate_video with get_cost:true, model cinematic_studio_video_v2, mode pro,
      duration 8, aspect_ratio 16:9, sound off. Report the cost.
   Do NOT submit any real job. Return {credits, plan, proClipCost, modelReachable}.`,
  { label: 'preflight', schema: {
      type: 'object', required: ['credits', 'proClipCost'],
      properties: { credits: {type:'number'}, plan: {type:'string'},
                    proClipCost: {type:'number'}, modelReachable: {type:'boolean'} } } }
)

if (!pre || pre.credits <= 0) {
  log(`ABORT: balance is ${pre?.credits ?? 'unknown'}. Nothing generated. Purchase a plan first.`)
  return { aborted: 'zero-balance', spent: 0 }
}
log(`balance ${pre.credits} cr (${pre.plan}); pro 8s clip = ${pre.proClipCost} cr`)

// ---------------------------------------------------------------------------
// The audit loop. This is the gate the whole build hangs on: an asset does not
// advance until the critic passes it. Bounded so a stubborn critic cannot burn
// the cap on one image.
// ---------------------------------------------------------------------------
async function generateUntilPass({ kind, label, prompt, unitCost, maxRounds = 3, extra = '' }) {
  let currentPrompt = prompt
  for (let round = 1; round <= maxRounds; round++) {
    charge(unitCost, `${label} round ${round}`)
    const gen = await agent(
      `Use the Higgsfield MCP. ${kind === 'still'
        ? `generate_image: model nano_banana_pro, resolution 4k, aspect_ratio 16:9.`
        : `generate_video: model cinematic_studio_video_v2, mode pro, duration 8, aspect_ratio 16:9, sound off.`}
       ${extra}
       PROMPT:
       ${currentPrompt}

       Poll job_status until done. Download the result into
       /home/arpit/Desktop/Resume/site-world/public/world/ and return its absolute path.`,
      { label: `gen:${label}:r${round}`, phase: kind === 'still' ? 'Hub still' : 'Motion', schema: GEN }
    )
    if (!gen?.ok) { log(`  ${label} generation failed: ${gen?.error}`); continue }

    const audit = await agent(
      `Audit this ${kind}: ${gen.path}

       Read the spec at /home/arpit/Desktop/Resume/site-world/docs/mind-world-spec.pdf
       (§9.1 ranked hub, §9.4 premium settings) and the rule files named in your instructions.
       Actually LOOK at the image/frames. This is round ${round} of ${maxRounds}.

       The prompt that produced it:
       ${currentPrompt}`,
      { label: `audit:${label}:r${round}`, agentType: 'design-auditor', schema: AUDIT }
    )
    if (!audit) { log(`  audit failed for ${label}`); continue }

    log(`  ${label} r${round}: ${audit.verdict}${audit.verdict === 'REVISE' ? ' — ' + audit.oneChange : ''}`)
    if (audit.verdict === 'PASS') return { ...gen, rounds: round, audit }

    if (!audit.promptDelta) {
      log(`  ${label}: critic says this cannot be fixed by prompting. Stopping this asset.`)
      return { ...gen, rounds: round, audit, unfixable: true }
    }
    currentPrompt = `${currentPrompt}\n\nREVISION (round ${round + 1}): ${audit.promptDelta}`
  }
  log(`  ${label}: exhausted ${maxRounds} rounds without a PASS. Escalating to Arpit.`)
  return { escalate: label }
}

// ---------------------------------------------------------------------------
// Step 1 — the hub still. Everything else is composed against it, so it is
// generated and audited ALONE before anything else is attempted.
// ---------------------------------------------------------------------------
phase('Hub still')
const HUB_PROMPT = `A vast dark cognitive chamber. At its centre, a slowly rotating core of
lit glass and travelling gold current — the most prominent object in frame. Around it,
five apertures, DELIBERATELY UNEQUAL:
  - Two large apertures flank the core, near, at eye level, warm key light. Dominant.
  - Two smaller apertures sit offset and further back, cooler, dimmer. Subordinate.
  - One aperture is set behind and below the core, deepest, coldest, hardest to reach.
The chamber is NOT symmetric. It must not read as five equal doors.
Warm near-black #17140F ground, single gold #D9A441 accent, no other hue.
Anamorphic, shallow depth of field, volumetric haze, fine 35mm grain. Cinematic, unpeopled.
Leave a quiet region in the left third for body copy.`

const hub = await generateUntilPass({
  kind: 'still', label: 'hub', prompt: HUB_PROMPT, unitCost: 4, maxRounds: 3,
})
if (hub.escalate || hub.unfixable) return { stopped: 'hub still never passed', hub, spent }

log(`hub still PASSED after ${hub.rounds} round(s) — ${spent} cr spent`)

// ---------------------------------------------------------------------------
// Step 2 — one pro clip from the approved hub still. This proves BOTH that the
// model is unlocked and that the camera reads as cinematic, for 12 credits.
// ---------------------------------------------------------------------------
phase('Motion')
const probe = await generateUntilPass({
  kind: 'clip', label: 'hub-probe', unitCost: pre.proClipCost, maxRounds: 2,
  extra: `Use the approved hub still as start_image: ${hub.path}`,
  prompt: `The camera drifts slowly forward into the chamber, the core growing. Eight seconds,
one continuous move, no cuts. Slow. The camera is on a dolly, not floating.`,
})
if (probe.escalate || probe.unfixable) return { stopped: 'motion probe never passed', probe, spent }

log(`motion probe PASSED. Model unlocked, camera reads cinematic. ${spent} cr spent.`)

// The remaining stills and clips are generated only after a human sees the two
// approved hero assets. Returning here on purpose — this is the checkpoint.
return {
  checkpoint: 'hero assets approved by auditor; awaiting Arpit before the remaining ~172 cr',
  hub: hub.path,
  probe: probe.path,
  spent,
  remainingBudget: SPEND_CAP - spent,
}
