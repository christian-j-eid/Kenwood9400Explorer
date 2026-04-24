// Component database for the Kenwood KR-9400 stereo receiver (1975)
// 120W RMS per channel, FM/AM tuner, full complement of controls

export const COMPONENTS = {

  'power-switch': {
    name: 'Power Switch',
    category: 'Power',
    description:
      'The main power switch connects 120V AC mains voltage to the primary winding of the power transformer. ' +
      'The KR-9400\'s switch is a heavy-duty rocker type rated for the full startup surge current — which can be ' +
      'several times the steady-state draw as the large filter capacitors charge from zero. After switching on, ' +
      'there is a brief 2-3 second delay before audio passes through: the output protection relay waits for the ' +
      'DC rails to stabilize before connecting the speakers, preventing the loud thump that would otherwise damage them.',
    tips: [
      'Unit dead after switching on: check the rear-panel fuse (2A slow-blow) and the internal power supply fuse',
      'Soft "click" followed by silence: the protection relay may be tripping due to excessive DC offset — check output transistors',
      'Fuse blows instantly: strongly suggests a shorted output transistor or failed rectifier diode in the power supply bridge',
    ]
  },

  'volume': {
    name: 'Master Volume Control',
    category: 'Controls',
    description:
      'A high-quality dual-gang logarithmic (audio-taper) potentiometer that simultaneously attenuates both left ' +
      'and right channels. The logarithmic taper is designed to match human hearing perception: equal angular steps ' +
      'on the knob produce equal perceived loudness changes across the entire rotation range. The KR-9400 uses a ' +
      'large Alps or equivalent pot with a center-detented position for channel tracking reference. ' +
      'The volume control sits between the preamplifier output and the power amplifier input.',
    tips: [
      'Crackling or scratching when rotating: pot tracks are oxidized — inject DeoxIT D5 into the shaft and rotate 20-30 times',
      'One channel cuts in and out at certain positions: worn resistive track — the pot likely needs replacement',
      'Channel imbalance at very low volumes: normal due to pot-tracking tolerance at extreme rotation; use the balance control to compensate',
    ]
  },

  'bass': {
    name: 'Bass Tone Control',
    category: 'Tone Controls',
    description:
      'A Baxandall-type shelving equalizer that boosts or cuts low frequencies, centered around 100 Hz, by up to ' +
      '±10 dB. The Baxandall design uses a passive RC network with an active stage, making it electrically flat ' +
      '(inserting no coloration at all) when the control is at its center detent position. Turning clockwise ' +
      'raises the low-frequency shelf; counter-clockwise lowers it. The shelving characteristic means all ' +
      'frequencies below ~100 Hz are affected equally, producing a smooth, natural-sounding boost or cut.',
    tips: [
      'For accurate sound reproduction, keep all tone controls at center (flat) and let your speakers and room do the work',
      'Crackling during adjustment indicates a dirty pot — same cleaning procedure as the volume control',
    ]
  },
  'mid': {
    name: 'Midrange Tone Control',
    category: 'Tone Controls',
    description:
      'A peaking equalizer centered around 1 kHz — the heart of the audible frequency range where vocals, ' +
      'guitars, and most acoustic instruments live. Unlike the bass and treble shelving controls, the midrange ' +
      'control uses a bell-shaped (peaking) curve that boosts or cuts a band of frequencies centered at the ' +
      'turnover point, leaving frequencies above and below relatively unaffected. The KR-9400 provides ±10 dB ' +
      'of midrange adjustment. This is the control most responsible for perceived "warmth" or "presence" — ' +
      'a cut at 1 kHz can add perceived depth and space; a boost emphasizes vocal clarity and attack.',
    tips: [
      'Boosting the midrange aggressively (beyond +6 dB) makes the sound nasal and fatiguing on long listening sessions',
      'A gentle mid cut (−3 to −6 dB) is a classic technique to add perceived bass and treble without actually boosting them',
      'Crackling during adjustment indicates oxidized pot tracks — clean with DeoxIT D5 and rotate through the full range several times',
    ]
  },
  'treble': {
    name: 'Treble Tone Control',
    category: 'Tone Controls',
    description:
      'A Baxandall-type shelving equalizer targeting high frequencies, centered around 10 kHz, with a ±10 dB range. ' +
      'Like the bass control it is passive and adds no coloration at the center detent. The shelving curve rises ' +
      'gradually from the turnover frequency, affecting all content above ~5 kHz. This is distinct from a peaking ' +
      'EQ, which only affects a narrow band — the shelving approach sounds more natural on program material.',
    tips: [
      'Boosting treble beyond +6 dB will emphasize surface noise on vinyl and tape hiss on cassettes',
      'If the treble sounds harsh at moderate settings, check the output transistors — crossover distortion adds odd-order harmonics that emphasize high frequencies',
    ]
  },

  'balance': {
    name: 'Balance Control',
    category: 'Controls',
    description:
      'A dual-gang potentiometer wired in opposition: turning right gradually attenuates the left channel while ' +
      'leaving the right channel at unity, and vice versa. Unlike the volume control, the balance pot only ' +
      'attenuates — it cannot add gain. At the center position, both channels pass at equal level. ' +
      'The control is useful for compensating for asymmetric room acoustics, an off-center listening position, ' +
      'or mismatched speaker sensitivities.',
    tips: [
      'Significant balance shift with knob centered: suspect a blown channel, a failing output transistor, or a cold solder joint',
      'One channel missing entirely: use the balance control to confirm — if you can hear that channel when fully panned, the issue is upstream (source/selector)',
    ]
  },

  'input-selector': {
    name: 'Input Source Selector',
    category: 'Controls',
    description:
      'A multi-position rotary switch that routes one of six source inputs to the preamplifier. The KR-9400 ' +
      'offers: PHONO 1 and PHONO 2 (for turntables with moving-magnet cartridges, with full RIAA equalization), ' +
      'TUNER (the built-in FM/AM section), AUX 1 and AUX 2 (line-level inputs at ~150mV sensitivity), and ' +
      'TAPE PLAY (for cassette or reel-to-reel decks). The switch simultaneously routes both left and right ' +
      'channels. High-quality switches use silver-plated contacts to minimize signal degradation.',
    tips: [
      'Intermittent audio on one input but not others: the switch contacts for that position are oxidized — work it back and forth after applying contact cleaner',
      'Hum on PHONO but not LINE inputs: classic ground loop — connect the turntable\'s chassis ground wire to the GND terminal on the rear panel',
      'No audio on any input: check the volume control and the protection relay before suspecting the input selector',
    ]
  },

  'mode-selector': {
    name: 'Listening Mode Selector',
    category: 'Controls',
    description:
      'Controls how the stereo signal is processed before reaching the power amplifier. ' +
      'STEREO passes the left and right channels independently. MONO sums both channels to a single mono signal ' +
      'played through both speakers — useful for noisy FM broadcasts or damaged recordings. REVERSE swaps the ' +
      'two channels. Some positions also control the stereo-widening network. ' +
      'The KR-9400 achieves mono by combining signals at the preamplifier stage, before the power amp, so both ' +
      'channels receive an identical summed signal.',
    tips: [
      'Switch to MONO on weak FM stations — the stereo decoder adds noise when the stereo pilot signal is marginal; mono reception is significantly quieter',
      'Use MONO to diagnose a dead channel: if you hear sound in both speakers in MONO but one is silent in STEREO, the fault is in the power amp or speaker path for that channel',
    ]
  },

  'tuning-dial': {
    name: 'FM/AM Tuning Dial',
    category: 'Tuner',
    description:
      'A precision flywheel-damped mechanism driving a variable tuning capacitor (5-gang on FM) inside the ' +
      'tuner front-end. Rotating the knob changes the capacitor\'s value, which shifts the resonant frequency ' +
      'of the LC tank circuits, selecting which station\'s RF signal is amplified. The flywheel gives the dial ' +
      'smooth, momentum-driven movement. A cord-and-pulley system connects the knob to both the capacitor and ' +
      'the visible frequency pointer on the dial scale. The KR-9400\'s FM range is 87.5–108 MHz; AM is 530–1620 kHz.',
    tips: [
      'Pointer moves but frequency drifts: the dial cord may be worn or slipping on the pulley — inspect and replace the cord',
      'Poor FM sensitivity: connect a 75-ohm coaxial antenna to the rear FM terminal; even a simple folded dipole dramatically improves reception',
      'AM reception poor: the ferrite bar antenna is inside the chassis and is directional — rotating the unit 90° can improve AM signal strength significantly',
    ]
  },

  // 'vu-left': {
  //   name: 'Left Channel VU Meter',
  //   category: 'Meters',
  //   description:
  //     'A moving-coil galvanometer calibrated in Volume Units (VU). The meter integrates the audio signal over ' +
  //     'a 300ms window, displaying average program level rather than instantaneous peaks. The scale is ' +
  //     'logarithmic: 0 VU corresponds to the KR-9400\'s rated output of 120W into 8 ohms. The warm amber ' +
  //     'backlight is provided by a small #47 incandescent lamp (6.3V). The needle pivots on jeweled bearings ' +
  //     'and is balanced with a counterweight, giving the characteristic graceful sweep.',
  //   tips: [
  //     'Needle sluggish or stuck: the meter mechanism has a bent needle or worn pivot — the meter assembly must be removed and carefully opened to repair',
  //     'Left meter reads noticeably lower than right at the same volume: degraded output transistor or imbalanced bias in the left power amp stage',
  //     'Backlight not working: the #47 lamp has burned out — a very common maintenance item on 40–50 year old receivers',
  //   ]
  // },

  // 'vu-right': {
  //   name: 'Right Channel VU Meter',
  //   category: 'Meters',
  //   description:
  //     'Identical in construction to the left channel meter, monitoring the right channel output power. The pair ' +
  //     'of meters provides real-time visual feedback about the amplifier\'s output level and helps immediately ' +
  //     'identify a dead or degraded channel. The KR-9400\'s meters are matched at the factory to read within ' +
  //     '±1 dB of each other. They are driven from a sensing circuit tapped off the speaker output, with a ' +
  //     'series resistor setting the deflection sensitivity.',
  //   tips: [
  //     'Erratic or flickering needle: cold solder joint on the meter sense connection on the main amp board — re-flow the joint',
  //     'Both meters pegged at maximum and won\'t move down: check for DC on the output rails — a failed output transistor can put DC voltage straight into the meter circuit',
  //   ]
  // },

  'loudness-switch': {
    name: 'Loudness Contour Switch',
    category: 'Controls',
    description:
      'Applies a frequency-dependent boost to bass (and to a lesser extent treble) at low listening levels. ' +
      'This compensates for the well-documented Fletcher-Munson effect: the human ear becomes progressively ' +
      'less sensitive to low and high frequencies as volume decreases. Without compensation, music sounds ' +
      'thin and lacking bass at low volumes. The KR-9400\'s loudness circuit is tied to the volume potentiometer ' +
      'tap, so the correction automatically reduces as the volume is raised — the effect is greatest at the ' +
      'lowest volume settings.',
    tips: [
      'For flat, studio-accurate reproduction at moderate-to-high volumes, disable the loudness contour',
      'The loudness curve is calibrated for a specific reference level — if it sounds excessive, try it with the volume a bit higher',
    ]
  },

  'tape-monitor': {
    name: 'Tape Monitor Switch',
    category: 'Controls',
    description:
      'Inserts an external tape deck into the signal path, allowing you to hear the tape deck\'s playback head ' +
      'output (rather than the direct source) while recording. This is essential for monitoring the actual ' +
      'recorded signal in real time, catching distortion or level problems as they happen. When engaged, the ' +
      'signal from the selected input goes OUT via the Tape Record outputs, and the signal coming back from the ' +
      'Tape Playback inputs is what you hear. The KR-9400 supports two tape loops (Tape 1 and Tape 2), ' +
      'enabling dubbing between decks.',
    tips: [
      'No audio with tape monitor engaged: both the record (output) and playback (input) cables must be connected to the tape deck',
      'Tape monitor produces hum: the tape deck may have a ground loop with the receiver — try a ground lift adapter on the deck\'s power cable',
    ]
  },

  'headphone-jack': {
    name: 'Headphone Output',
    category: 'Outputs',
    description:
      'A standard 1/4" (6.35mm) TRS stereo jack tapped directly off the speaker amplifier output through a ' +
      'resistive divider network. There is no dedicated headphone amplifier stage — the main power amp drives ' +
      'the headphones through series resistors (typically 150–330 ohms) which both attenuate the output and ' +
      'provide some damping. This approach works adequately with medium-to-high impedance headphones (100–600 ' +
      'ohms) but can sound harsh with modern low-impedance designs (16–32 ohms), which load the resistor ' +
      'divider and affect frequency response.',
    tips: [
      'Volume much lower through headphones than through speakers: the series resistors may have drifted in value — measure across them',
      'One ear channel dead: inspect the 1/4" jack for a bent contact or oxidized sleeve connection',
      'Low-impedance (16–32Ω) headphones sound bass-heavy: this is a known characteristic of passive headphone taps — a dedicated headphone amp will give better results',
    ]
  },

  // ── Internal components (visible when cover is open) ──

  'power-transformer': {
    name: 'Power Transformer',
    category: 'Power Supply',
    description:
      'The largest and heaviest single component in the receiver, typically weighing 3–4 kg. This laminated ' +
      'EI-core transformer steps 120V AC mains down to multiple lower AC voltages via separate secondary ' +
      'windings: approximately ±55V AC for the main power amplifier rails (rectified to ±78V DC), and lower ' +
      'voltages (12–30V) for the preamplifier, tuner, protection relay, and lamp supply. The core is ' +
      'designed to handle the KR-9400\'s full 120W-per-channel output continuously. A thermal fuse is ' +
      'embedded in the winding to protect against overheating.',
    tips: [
      'Persistent humming: caused by magnetostriction in the core laminations — loose laminations (common with age), DC offset on the AC line, or overloading can all cause audible hum',
      'Transformer warm but not hot is normal at full power — if too hot to hold your hand on, suspect a failing filter capacitor drawing excess ripple current',
      'Never operate without the transformer\'s original thermal fuse — a shorted winding without it can cause a fire',
    ]
  },

  'filter-caps': {
    name: 'Main Filter Capacitors',
    category: 'Power Supply',
    description:
      'The two large electrolytic capacitors (typically 10,000–22,000 µF, 80V each) that smooth the rectified ' +
      'AC from the bridge rectifier into stable DC for the amplifier rails. After the four rectifier diodes ' +
      'convert the AC sine wave into a pulsing positive (or negative) voltage, these capacitors act as ' +
      'reservoirs: they charge during voltage peaks and discharge to fill in the valleys, producing a nearly ' +
      'steady DC rail. Their large capacitance also provides instantaneous current for loud musical transients ' +
      'that the transformer alone cannot supply fast enough.',
    tips: [
      'Low-frequency hum (50/60 Hz) that changes with volume: classic symptom of aging filter caps that have lost capacitance as their electrolyte dries out over decades',
      'Recapping (replacing the filter caps with modern equivalents) is the single most impactful restoration procedure for a 40-50 year old receiver',
      'Bulging top vents or visible dried electrolyte around the base: the capacitor has vented or leaked and must be replaced immediately',
    ]
  },

  'output-transistors': {
    name: 'Output Transistors & Heatsinks',
    category: 'Power Amplifier',
    description:
      'Complementary pairs of NPN and PNP bipolar power transistors (the KR-9400 uses Sanken or equivalent ' +
      '2SC/2SA series devices) operating in a push-pull class AB configuration. NPN devices handle the positive ' +
      'half-cycles of the audio waveform; PNP devices handle the negative half-cycles. Together they can swing ' +
      'the full output voltage into the speaker load. Each transistor dissipates up to 30W as heat in normal ' +
      'operation, requiring the large machined aluminum heatsinks that run along the inside of the chassis ' +
      'sides. A small amount of idle (quiescent) current is set by a bias trimmer to eliminate crossover ' +
      'distortion at the zero-crossing point.',
    tips: [
      'Dead or severely distorted channel: measure DC voltage at the speaker terminals — more than ±50mV indicates a failed output transistor',
      'Protection relay repeatedly engages and disconnects: a shorted output transistor puts a large DC offset on the output, triggering protection',
      'Check heatsink compound (thermal paste) between the transistor body and heatsink — dried-out compound causes overheating even when the transistors themselves are healthy',
    ]
  },

  'amp-board': {
    name: 'Main Amplifier PCB',
    category: 'Power Amplifier',
    description:
      'The primary circuit board carrying the complete power amplifier for both channels. The signal path ' +
      'starts with a long-tailed differential pair (the input stage), which compares the incoming audio signal ' +
      'to the feedback signal from the speaker output. The error is amplified by the voltage amplification ' +
      'stage (VAS), then current-boosted by the driver transistors, and finally delivered to the output ' +
      'transistors. Overall negative feedback is applied from output to input to dramatically reduce ' +
      'distortion. The board also carries the DC offset and bias trimmer potentiometers for field adjustment.',
    tips: [
      'Intermittent distortion or channel drop: look for cold solder joints around the driver transistors and the large emitter-resistor resistors',
      'DC offset trimmer: adjust R-xx (refer to service manual) with a multimeter at the speaker terminals — target <±10mV with no input signal',
      'Bias trimmer: measures across the emitter resistors — too low causes crossover distortion (audible grit), too high overheats the output transistors',
    ]
  },

  'preamp-board': {
    name: 'Preamplifier PCB',
    category: 'Preamplifier',
    description:
      'Contains the RIAA phono equalization amplifier, the tone control active stage, and the line-level ' +
      'buffer/selector circuitry. The phono stage is critical: a moving-magnet cartridge outputs only 2–5mV, ' +
      'which must be amplified by about 40 dB. Simultaneously, the RIAA equalization curve is applied — a ' +
      'precise frequency response that mirrors the inverse of the playback curve used when cutting vinyl ' +
      'masters. Without RIAA equalization, bass would be overwhelming and treble anemic. Line-level inputs ' +
      '(Aux, Tape) bypass the phono stage entirely and go directly to the selector.',
    tips: [
      'Hum on phono inputs: check the cartridge ground wire — it must connect to the GND terminal on the rear panel, not just to the RCA shield',
      'Excessive hiss on phono: the input transistors or JFETs in the phono stage may have degraded with age — they can be replaced with modern low-noise equivalents',
      'One channel of phono is brighter or duller: a component in the RIAA network has drifted in value — check the EQ capacitors with a capacitance meter',
    ]
  },

  'tuner-board': {
    name: 'FM/AM Tuner PCB',
    category: 'Tuner',
    description:
      'A complete FM superheterodyne receiver on a shielded PCB. The tuner front-end amplifies the received ' +
      'RF signal from the antenna, then mixes it with a voltage-controlled local oscillator to produce a ' +
      'fixed 10.7 MHz intermediate frequency (IF), regardless of the tuned station. The IF strip amplifies ' +
      'this signal with high selectivity (rejecting adjacent stations) through a series of ceramic or LC ' +
      'filters. A ratio detector or phase-locked loop (PLL) then demodulates the FM carrier to recover the ' +
      'composite audio signal. The stereo decoder separates the 38 kHz subcarrier to reconstruct independent ' +
      'left and right channels. The separate AM section uses a 455 kHz IF.',
    tips: [
      'Weak FM or missing stations: verify the 75-ohm antenna connection; the KR-9400 has excellent sensitivity (1.8 µV IHF) but needs a proper antenna',
      'Stereo indicator won\'t light on strong stations: the 19 kHz pilot detection circuit threshold may need adjustment (trimmer on tuner board)',
      'FM sounds mono even with the mode selector on STEREO: the stereo decoder\'s 38 kHz oscillator may have drifted — check and align the VCO trimmer',
    ]
  },

};
