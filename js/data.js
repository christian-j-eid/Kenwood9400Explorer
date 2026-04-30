// Component database for the Kenwood KR-9400 stereo receiver (1975)
// 120W RMS per channel, FM/AM tuner, full complement of controls

export const COMPONENTS = {

  'power-switch': {
    name: 'Power Switch',
    type: 'Rocker Switch',
    category: 'Power',
    description:
      'Connects mains voltage to the power transformer. After switching on, a 2–3 second delay is normal — ' +
      'the protection relay waits for the DC rails to stabilize before connecting the speakers.',
    tips: [
      'Unit dead: check the rear-panel fuse (2A slow-blow) first',
      'Click then silence: protection relay tripping — check output transistors for DC offset',
      'Fuse blows instantly: strongly suggests a shorted output transistor or failed rectifier diode',
    ]
  },

  'volume': {
    name: 'Master Volume Control',
    type: 'Rotary Knob',
    category: 'Controls',
    description:
      'A dual-gang logarithmic potentiometer controlling both channels simultaneously. The log taper matches ' +
      'human hearing so equal knob rotation produces equal perceived loudness change. Sits between the ' +
      'preamplifier output and power amplifier input.',
    tips: [
      'Crackling when rotating: oxidized tracks — inject DeoxIT D5 and rotate 20–30 times',
      'One channel cuts out at certain positions: worn resistive track — pot likely needs replacement',
      'Channel imbalance at very low volumes: normal pot-tracking tolerance; use the balance control',
    ]
  },

  'bass': {
    name: 'Bass Tone Control',
    type: 'Rotary Knob',
    category: 'Tone Controls',
    description:
      'Baxandall shelving equalizer centered around 100 Hz, ±10 dB range. Electrically flat at the center ' +
      'detent — no coloration is added when set to 12 o\'clock.',
    tips: [
      'For accurate reproduction, keep at center and let your room and speakers do the work',
      'Crackling during adjustment: dirty pot — clean with DeoxIT D5',
    ]
  },

  'mid': {
    name: 'Midrange Tone Control',
    type: 'Rotary Knob',
    category: 'Tone Controls',
    description:
      'Peaking (bell-shaped) equalizer centered at 1 kHz, ±10 dB. Unlike the bass and treble shelving ' +
      'controls, it only affects a band of frequencies around the center point — leaving everything ' +
      'else untouched. The most sensitive control for perceived vocal presence and warmth.',
    tips: [
      'Boosting beyond +6 dB makes the sound nasal and fatiguing quickly',
      'A gentle cut (−3 to −6 dB) can add perceived space without touching bass or treble',
      'Crackling during adjustment: oxidized tracks — clean with DeoxIT D5',
    ]
  },

  'treble': {
    name: 'Treble Tone Control',
    type: 'Rotary Knob',
    category: 'Tone Controls',
    description:
      'Baxandall shelving equalizer above ~5 kHz, ±10 dB range. Like the bass control, it is flat at ' +
      'center detent and adds no coloration unless turned.',
    tips: [
      'Boosting beyond +6 dB emphasizes surface noise on vinyl and hiss on tape',
      'Harsh treble at moderate settings: check output transistors — crossover distortion adds high-frequency harmonics',
    ]
  },

  'balance': {
    name: 'Balance Control',
    type: 'Rotary Knob',
    category: 'Controls',
    description:
      'Attenuates one channel relative to the other. It can only reduce — not add — gain, so both channels ' +
      'are at full level only at the center position.',
    tips: [
      'Imbalance with knob centered: suspect a failing output transistor or cold solder joint',
      'One channel completely missing: pan fully to that side — if it appears, the fault is upstream of the power amp',
    ]
  },

  'input-selector': {
    name: 'Input Source Selector',
    type: 'Rotary Switch',
    category: 'Controls',
    description:
      'Routes one of six inputs to the preamplifier: PHONO 1 & 2 (moving-magnet with RIAA equalization), ' +
      'TUNER, AUX 1 & 2 (line-level), and TAPE PLAY. Both channels are switched simultaneously.',
    tips: [
      'Intermittent audio on one input only: oxidized switch contacts — work it back and forth with contact cleaner applied',
      'Hum on PHONO but not LINE: ground loop — connect the turntable chassis ground wire to the rear GND terminal',
      'No audio on any input: check the volume control and protection relay before suspecting the selector',
    ]
  },

  'mode-selector': {
    name: 'Listening Mode Selector',
    type: 'Rotary Switch',
    category: 'Controls',
    description:
      'Selects STEREO, MONO (both channels receive the summed signal), or REVERSE (channels swapped). ' +
      'Mono is useful for noisy FM broadcasts or diagnosing a dead channel.',
    tips: [
      'Switch to MONO on weak FM — the stereo decoder adds significant noise when the pilot signal is marginal',
      'Sound in both speakers in MONO but silent in STEREO on one side: fault is in the power amp or speaker path',
    ]
  },

  'tuning-dial': {
    name: 'FM/AM Tuning Dial',
    type: 'Flywheel Knob',
    category: 'Tuner',
    description:
      'A flywheel-damped knob driving a 5-gang variable capacitor via cord-and-pulley. Changing the ' +
      'capacitance shifts the resonant frequency of the tuner\'s LC tank circuits, selecting the station. ' +
      'The flywheel gives the characteristic smooth, momentum-driven feel. FM range: 87.5–108 MHz; AM: 530–1620 kHz.',
    tips: [
      'Pointer moves but frequency drifts: dial cord worn or slipping — inspect and replace',
      'Poor FM reception: connect a 75-ohm antenna to the rear terminal; even a simple dipole makes a large difference',
      'Poor AM reception: the internal ferrite bar antenna is directional — try rotating the unit 90°',
    ]
  },

  'loudness-switch': {
    name: 'Loudness Contour Switch',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'Adds a bass (and slight treble) boost at low volumes to compensate for the Fletcher-Munson effect — ' +
      'the ear\'s reduced sensitivity to low and high frequencies at quiet listening levels. The correction ' +
      'automatically diminishes as volume is raised.',
    tips: [
      'Disable at moderate-to-high volumes for flat, accurate reproduction',
      'If the effect sounds excessive, try raising the volume slightly — the curve is calibrated to a specific reference level',
    ]
  },

  'tape-monitor': {
    name: 'Tape Monitor Switch',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'Lets you hear the tape deck\'s playback head output while recording, so you\'re monitoring the ' +
      'actual recorded signal rather than the source. The KR-9400 supports two tape loops for deck-to-deck dubbing.',
    tips: [
      'No audio with monitor engaged: both record and playback cables must be connected to the deck',
      'Hum with monitor engaged: ground loop between deck and receiver — try a ground lift on the deck\'s power cable',
    ]
  },

  'headphone-jack': {
    name: 'Headphone Output',
    type: '1/4" Jack',
    category: 'Outputs',
    description:
      'A passive 1/4" TRS jack tapped off the speaker output through series resistors (150–330Ω). There is ' +
      'no dedicated headphone amp — the main power amp drives the headphones directly through those resistors. ' +
      'Works well with 100–600Ω headphones; low-impedance modern designs (16–32Ω) can sound tonally uneven.',
    tips: [
      'Much lower volume than speakers: series resistors may have drifted — measure them',
      'One ear dead: check the jack for a bent or oxidized contact',
      '16–32Ω headphones sound bass-heavy: a known limitation of passive taps — a dedicated headphone amp resolves this',
    ]
  },

  // ── Internal components (visible when cover is open) ──

  'power-transformer': {
    name: 'Power Transformer',
    type: 'EI-Core Transformer',
    category: 'Power Supply',
    description:
      'The heaviest single component (3–4 kg), stepping 120V AC down to multiple secondaries: ±55V AC for ' +
      'the main amplifier rails and lower voltages for the preamp, tuner, and lamps. A thermal fuse is ' +
      'embedded in the winding as a last-resort overheating protection.',
    tips: [
      'Audible hum: loose core laminations, DC on the AC line, or a failing filter capacitor drawing excess ripple current',
      'Hot to the touch: suspect a failing filter capacitor — a warm transformer at full power is normal, but hot is not',
      'Never run without the original thermal fuse in place',
    ]
  },

  'filter-caps': {
    name: 'Main Filter Capacitors',
    type: 'Electrolytic Capacitor',
    category: 'Power Supply',
    description:
      'Two large electrolytics (typically 10,000–22,000 µF, 80V) that smooth the pulsing rectified AC into ' +
      'stable DC rails. They also act as a local current reservoir for loud transients the transformer alone ' +
      'can\'t supply fast enough. After 40–50 years, the electrolyte dries out and capacitance drops — ' +
      'replacing them is the single most impactful restoration step on a vintage receiver.',
    tips: [
      '50/60 Hz hum that varies with volume: classic dried-out filter cap symptom',
      'Bulging vents or dried electrolyte around the base: cap has vented — replace immediately',
    ]
  },

  'output-transistors': {
    name: 'Output Transistors & Heatsinks',
    type: 'Bipolar Power Transistor',
    category: 'Power Amplifier',
    description:
      'Complementary NPN/PNP pairs in a push-pull class AB configuration. Each transistor dissipates up to ' +
      '30W continuously, hence the large aluminum heatsinks. A bias trimmer sets the small quiescent current ' +
      'that eliminates crossover distortion at the zero-crossing point.',
    tips: [
      'Dead or distorted channel: measure DC at the speaker terminals — more than ±50mV means a failed output transistor',
      'Protection relay repeatedly trips: a shorted transistor is putting DC on the output',
      'Overheating despite low power: check the thermal paste between transistor and heatsink — it dries out with age',
    ]
  },

  'amp-board': {
    name: 'Main Amplifier PCB',
    type: 'Circuit Board',
    category: 'Power Amplifier',
    description:
      'Carries the complete two-channel power amplifier. The signal chain runs from a differential input pair, ' +
      'through a voltage amplification stage and driver transistors, to the output devices. Overall negative ' +
      'feedback from output to input keeps distortion very low. DC offset and bias trimmers on this board ' +
      'require periodic adjustment.',
    tips: [
      'Intermittent distortion: look for cold solder joints around the driver transistors and emitter resistors',
      'DC offset target: <±10mV at the speaker terminals with no input — adjust the offset trimmer per the service manual',
      'Bias too low causes audible crossover grit; too high overheats the output transistors',
    ]
  },

  'preamp-board': {
    name: 'Preamplifier PCB',
    type: 'Circuit Board',
    category: 'Preamplifier',
    description:
      'Houses the phono stage (RIAA equalization, ~40 dB gain for 2–5mV cartridge signals), the tone control ' +
      'active stage, and the line-level input buffer. Line inputs like AUX and TAPE bypass the phono stage entirely.',
    tips: [
      'Hum on phono: the cartridge ground wire must connect to the GND terminal on the rear panel',
      'Excessive phono hiss: input transistors may have degraded — modern low-noise replacements are available',
      'One phono channel sounds tonally different: an RIAA network component has drifted — check EQ capacitors',
    ]
  },

  'tuner-board': {
    name: 'FM/AM Tuner PCB',
    type: 'Circuit Board',
    category: 'Tuner',
    description:
      'A complete FM superheterodyne receiver. The front-end mixes the incoming RF with a local oscillator ' +
      'to produce a fixed 10.7 MHz IF, which is then filtered, amplified, and demodulated. A stereo decoder ' +
      'separates the 38 kHz subcarrier to reconstruct left and right channels. The AM section operates at ' +
      '455 kHz IF. The KR-9400\'s FM sensitivity is rated at 1.8 µV IHF.',
    tips: [
      'Weak FM: verify the 75-ohm antenna — sensitivity is excellent but it still needs a proper antenna',
      'Stereo indicator won\'t light: 19 kHz pilot detection threshold may need trimmer adjustment on the board',
      'Stereo but sounds mono: the 38 kHz VCO has drifted — realign the stereo decoder trimmer',
    ]
  },

  // ── Front-panel switches & controls (GLB mesh names) ──

  'speaker-control': {
    name: 'Speaker Selector',
    type: 'Rotary Switch',
    category: 'Controls',
    description:
      'Routes the amplifier output to Speaker A, Speaker B, both (A+B), or OFF. Running A+B halves the ' +
      'impedance seen by the amp — two 8Ω pairs becomes a 4Ω load, which the KR-9400 handles but at the ' +
      'cost of increased thermal stress at high power.',
    tips: [
      'One system intermittently silent: oxidized switch contacts — apply contact cleaner and cycle repeatedly',
      'Avoid running two 4Ω pairs simultaneously — the 2Ω combined load risks triggering protection or damaging output transistors',
    ]
  },

  'tape-dubbing': {
    name: 'Tape Dubbing Switch',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'Routes Deck 1\'s playback output to Deck 2\'s record input for real-time tape copying. The receiver ' +
      'passes the signal at line level without any processing — copy quality depends entirely on the decks.',
    tips: [
      'Copy sounds muffled: Dolby NR mismatch between decks — match NR settings on both',
      'Level difference: adjust at the source deck, not the receiver volume',
    ]
  },

  'tone-defeat': {
    name: 'Tone Defeat Switch',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'Bypasses all tone control circuitry, connecting the preamp directly to the power amp. Even with tone ' +
      'controls centered, the passive RC network adds slight insertion loss and phase shift — defeat removes ' +
      'it entirely for the flattest possible signal path.',
    tips: [
      'Sound changes noticeably when toggling with all controls centered: a tone pot is dirty or a network component has drifted',
      'Leave engaged for critical listening — tone controls add coloration that can mask speaker and room problems',
    ]
  },

  'sound-injection': {
    name: 'Sound Injection Switch',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'Sums an external signal into the main path before the power amp, bypassing the input selector and ' +
      'tone controls. Level is set by the Mix Level knob.',
    tips: [
      'Hum when active: ground loop with the external device — try a DI box with ground lift',
      'Signal bleeds through when off: switch contacts worn or dirty — clean with contact cleaner',
    ]
  },

  'mix-level': {
    name: 'Mix Level Control',
    type: 'Rotary Knob',
    category: 'Controls',
    description:
      'Sets the level of the injected signal relative to the main source. Uses a linear-taper pot — ' +
      'more intuitive than a log taper when blending two sources by ear.',
    tips: [
      'Crackling when adjusting: pot oxidation — clean with DeoxIT D5',
      'No effect: confirm the Sound Injection switch is engaged and the source is connected',
    ]
  },

  'multipath': {
    name: 'Multipath Indicator',
    type: 'Meter / Indicator',
    category: 'Tuner',
    description:
      'Shows the level of FM multipath — signal reflections arriving delayed at the antenna, causing ' +
      'distortion in the demodulated audio. A lower reading means a cleaner signal. Use it while ' +
      'physically rotating a directional antenna to find the minimum-interference position.',
    tips: [
      'High reading in an urban area: a directional (Yagi) antenna aimed at the transmitter is usually the only real fix',
      'Switch to MONO on high-multipath stations — it eliminates the stereo subcarrier artifacts entirely',
    ]
  },

  'fm-muting': {
    name: 'FM Muting Switch',
    type: 'Toggle Switch',
    category: 'Tuner',
    description:
      'Silences the output when the received FM signal drops below a threshold, eliminating the harsh noise ' +
      'between stations while tuning. Defeat it to hear weak but listenable stations that fall just below the cutoff.',
    tips: [
      'Station cuts in and out: signal is marginal — defeat muting and switch to MONO',
      'No muting at all: check the FET muting transistor on the tuner board',
    ]
  },

  'fm-dolby-nr': {
    name: 'FM Dolby NR Switch',
    type: 'Toggle Switch',
    category: 'Tuner',
    description:
      'Applies Dolby B decoding to FM broadcasts transmitted with Dolby B encoding — a format that was ' +
      'briefly used by some stations in the late 1970s and is now essentially extinct. Engaging it on a ' +
      'standard unencoded broadcast makes the audio sound harshly over-bright.',
    tips: [
      'Only engage if the station explicitly broadcasts Dolby FM — virtually none do today',
      'Treble sounds dull with NR off: the bypass relay contacts may be oxidized',
    ]
  },

  'filter-low': {
    name: 'Low-Cut Filter (Subsonic)',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'A steep high-pass filter (~18 dB/octave) below 20 Hz that removes subsonic energy from record warp, ' +
      'tonearm resonance, and mechanical rumble. These frequencies are inaudible but waste amplifier headroom ' +
      'and cause visible woofer cone pumping.',
    tips: [
      'Always engage on vinyl playback — subsonic content from warp is nearly universal',
      'Woofer pumping visibly at low volume: engage the filter or check for a warped record',
    ]
  },

  'filter-high': {
    name: 'High-Cut Filter',
    type: 'Toggle Switch',
    category: 'Controls',
    description:
      'A fixed low-pass filter (~7–15 kHz cutoff) that reduces tape hiss, FM noise, and vinyl surface noise. ' +
      'Unlike the treble control, it has a fixed slope and is optimized for broadband noise, not tonal shaping.',
    tips: [
      'Useful on cassette playback without Dolby NR to tame hiss simply',
      'Do not use on clean sources — it softens transients and rolls off high-frequency extension noticeably',
    ]
  },

  'deviation-signal': {
    name: 'Signal / Deviation Meter',
    type: 'Meter / Indicator',
    category: 'Tuner',
    description:
      'Dual-function meter showing FM signal strength (µV at the antenna) and FM carrier deviation ' +
      '(as a percentage of ±75 kHz maximum). Together they distinguish between weak-signal reception ' +
      'problems and transmitter over-modulation.',
    tips: [
      'Needle pegged even on weak stations: signal meter driver circuit has failed — check the transistor on the tuner board',
      'Needle stuck at zero with antenna connected: suspect the IF detector output feeding the meter',
    ]
  },

  'am-muting': {
    name: 'AM Muting Switch',
    type: 'Toggle Switch',
    category: 'Tuner',
    description:
      'Silences the output between AM stations during tuning. The threshold circuit monitors the unmodulated ' +
      'carrier level rather than the audio, since AM encodes audio in the carrier amplitude.',
    tips: [
      'AM is inherently noisier than FM — muting is especially worthwhile on the AM band',
      'Distant stations fading at night: muting prevents abrupt static bursts during ionospheric fades',
    ]
  },

  // ── Internal PCB units (Blender mesh names) ──

  'power-supply-unit': {
    name: 'Power Supply Unit',
    type: 'Circuit Board',
    category: 'Power Supply',
    description:
      'Houses the bridge rectifier, filter capacitors, and voltage regulation circuitry that converts the ' +
      'transformer\'s AC secondaries into clean DC rails. Supplies ±78V DC to the power amplifier and ' +
      'regulated lower voltages to the preamp and tuner sections.',
    tips: [
      'Hum on all inputs: start diagnosis here — a failing rectifier diode or dried filter cap is the most common cause',
      'Measure DC rail voltages first when troubleshooting — a sagging rail points directly to this unit',
    ]
  },

  'main-amp-unit': {
    name: 'Main Amplifier Unit',
    type: 'Circuit Board',
    category: 'Power Amplifier',
    description:
      'The primary power amplifier board for one channel. Runs the full signal chain from differential input ' +
      'pair through the voltage amplification stage, driver transistors, and output devices. Carries the ' +
      'DC offset and bias adjustment trimmers.',
    tips: [
      'DC offset target: <±10mV at the speaker terminal with no input signal',
      'Bias too low: audible crossover distortion; too high: output transistors overheat',
      'Cold solder joints around the driver transistors are the most common cause of intermittent distortion',
    ]
  },

  'main-amp-unit-2': {
    name: 'Main Amplifier Unit (Ch. 2)',
    type: 'Circuit Board',
    category: 'Power Amplifier',
    description:
      'Mirror of the main amplifier unit for the second channel. Identical circuit topology — each channel ' +
      'has its own independent board so a fault in one does not affect the other.',
    tips: [
      'Compare readings between both amp units when diagnosing — asymmetry between channels quickly identifies which board has the fault',
      'Bias and offset trimmers on both boards should be set independently',
    ]
  },

  'rf-unit': {
    name: 'RF Front-End Unit',
    type: 'Circuit Board',
    category: 'Tuner',
    description:
      'The first stage of the FM tuner — amplifies the weak antenna signal and mixes it with the local ' +
      'oscillator to produce the 10.7 MHz intermediate frequency. Uses a 5-gang variable capacitor for ' +
      'tuning. Sensitivity and image rejection are determined almost entirely by this unit.',
    tips: [
      'Poor sensitivity on all FM stations: suspect the RF amplifier transistor or a detuned input coil',
      'Image interference (a station heard at two dial positions): the front-end tracking is misaligned — requires signal generator alignment',
    ]
  },

  'push-sw-unit-a': {
    name: 'Push Switch Unit A',
    type: 'Switch Assembly',
    category: 'Controls',
    description:
      'A bank of illuminated push-button switches for source and function selection on the front panel. ' +
      'Each button latches mechanically and routes the corresponding signal path through the selector circuit.',
    tips: [
      'Button physically stuck: the latch mechanism has corroded or a broken spring — disassemble and clean or replace the switch',
      'Function selected but no audio: the switch contacts are oxidized — apply contact cleaner and actuate repeatedly',
    ]
  },

  'push-sw-unit-b': {
    name: 'Push Switch Unit B',
    type: 'Switch Assembly',
    category: 'Controls',
    description:
      'A second bank of push-button switches controlling additional functions such as filter engagement, ' +
      'loudness, and tape monitoring. Operates identically to Push Switch Unit A.',
    tips: [
      'Intermittent function with button pressed: worn contact — clean with DeoxIT and exercise the switch',
      'Button lamp not lighting: the indicator bulb has burned out — a common maintenance item on vintage receivers',
    ]
  },

  'lever-sw-unit-b': {
    name: 'Lever Switch Unit B',
    type: 'Switch Assembly',
    category: 'Controls',
    description:
      'A bank of lever (slide) switches for mode and filter selection. Lever switches use a wiping contact ' +
      'action that can accumulate oxidation over decades, causing intermittent switching behavior.',
    tips: [
      'Scratchy or intermittent switching: apply DeoxIT D5 to the contact area and slide each switch through its range several times',
      'Switch feels loose or no longer latches: the detent spring has fatigued — replacement is the only fix',
    ]
  },

  'pre-amp-unit': {
    name: 'Preamplifier Unit',
    type: 'Circuit Board',
    category: 'Preamplifier',
    description:
      'Contains the phono stage (RIAA equalization, ~40 dB gain), tone control active stage, and input ' +
      'buffer. Moving-magnet cartridge signals of 2–5mV enter here; line-level sources bypass the phono ' +
      'stage and connect directly to the selector.',
    tips: [
      'Hum on phono only: connect the turntable ground wire to the rear GND terminal',
      'Excessive phono hiss: input transistors have degraded with age — modern low-noise replacements available',
    ]
  },

  'multipath-unit': {
    name: 'Multipath Detection Unit',
    type: 'Circuit Board',
    category: 'Tuner',
    description:
      'Dedicated circuitry that monitors the 38 kHz stereo subcarrier level as a proxy for multipath ' +
      'interference. Drives the front-panel multipath meter. A higher reading means more reflected signal ' +
      'is arriving at the antenna.',
    tips: [
      'Meter reads high even on a strong local station: the unit\'s detector circuit may have a failed component, or the station genuinely has multipath at your location',
      'Meter completely dead: check the connection between this board and the IF unit',
    ]
  },

  'MPX-unit': {
    name: 'MPX Stereo Decoder Unit',
    type: 'Circuit Board',
    category: 'Tuner',
    description:
      'Decodes the FM stereo multiplex signal. Locks onto the 19 kHz stereo pilot tone, generates a ' +
      '38 kHz subcarrier, and separates the composite audio into independent left and right channels. ' +
      'If no pilot tone is detected, it outputs mono.',
    tips: [
      'Stereo indicator won\'t light on strong stations: the 19 kHz pilot detector threshold needs trimmer adjustment',
      'Stereo reception sounds like mono: the 38 kHz VCO has drifted — realign the decoder trimmer per the service manual',
      'Noisy stereo on marginal stations: switch to MONO — the decoder adds significant noise when the pilot signal is weak',
    ]
  },

  'if-unit': {
    name: 'IF Amplifier Unit',
    type: 'Circuit Board',
    category: 'Tuner',
    description:
      'Amplifies and filters the 10.7 MHz intermediate frequency signal from the RF front-end. A series ' +
      'of ceramic or LC filters provide the selectivity that rejects adjacent stations. The limiter stage ' +
      'removes AM noise from the FM carrier before demodulation.',
    tips: [
      'Poor adjacent-channel rejection (nearby stations bleeding through): an IF filter has drifted or failed',
      'Distortion on strong local stations: the limiter may be overdriven — check the IF gain trimmer',
    ]
  },

  'lever-sw-unit': {
    name: 'Lever Switch Unit',
    type: 'Switch Assembly',
    category: 'Controls',
    description:
      'A grouped assembly of lever switches on a shared mounting bracket, controlling related functions ' +
      'such as filters, tape monitoring, and tone defeat. Each switch operates independently but they ' +
      'share a common PCB connection point.',
    tips: [
      'One switch in the unit intermittent while others work: the fault is isolated to that switch\'s contacts — clean with DeoxIT D5',
      'All switches in the unit dead simultaneously: check the common ground or power connection to the unit\'s PCB',
    ]
  },

  'lever-sw': {
    name: 'Lever Switch',
    type: 'Lever Switch',
    category: 'Controls',
    description:
      'A slide-action switch used for mode and function selection on the front panel. The lever mechanism ' +
      'uses a wiping contact that can oxidize over decades, causing intermittent or noisy switching.',
    tips: [
      'Scratchy or intermittent action: apply DeoxIT D5 to the contact area and slide through the full range several times',
      'Switch no longer latches in position: the detent spring has fatigued and needs replacement',
    ]
  },

  'electrytic-capacitor': {
    name: 'Electrolytic Capacitor',
    type: 'Electrolytic Capacitor',
    category: 'Components',
    description:
      'Polarized capacitors used throughout the signal and power supply paths for filtering, coupling, and ' +
      'bypassing. Electrolytics have a finite lifespan — the liquid electrolyte slowly evaporates over ' +
      'decades, reducing capacitance and increasing ESR (equivalent series resistance).',
    tips: [
      'Bulging tops or visible leakage: replace immediately — a vented cap can damage nearby components',
      'Hum, distortion, or reduced bass: often caused by dried-out coupling or filter caps losing capacitance',
      'Age alone is reason enough to recap — caps from the 1970s are well past their rated lifespan',
    ]
  },

  'tone-amp-unit': {
    name: 'Tone Amplifier Unit',
    type: 'Circuit Board',
    category: 'Preamplifier',
    description:
      'The active stage that buffers and amplifies the signal through the passive bass, mid, and treble ' +
      'tone control networks. Provides the gain needed to compensate for the insertion loss of the passive ' +
      'RC tone network. Bypassed entirely when Tone Defeat is engaged.',
    tips: [
      'Low output level on all sources with tone defeat off but normal with it on: a component in the active stage has failed',
      'Distortion only when tone controls are away from center: check the op-amp or transistor pair in this unit',
    ]
  },

};

