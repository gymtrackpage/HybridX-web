import { WeekPlan } from './types';

export const introContent = {
  title: "The Science of the Hybrid Engine",
  subtitle: "Physiological Foundations of the 12-Week Protocol",
  sections: [
    {
      title: "1. Introduction: The Unique Demands of Hyrox",
      content: [
        "Hyrox represents a distinct challenge in the landscape of endurance sports. Unlike a marathon (purely aerobic) or CrossFit (high-intensity mixed-modal), Hyrox is a test of High-Intensity Functional Endurance.",
        "Scientific analysis of race data reveals that running constitutes approximately 50% to 60% of the total event time. However, the physiological cost of this running is fundamentally different from a standard 8km race. In Hyrox, the athlete operates in a state of Compromised Biomechanics and Metabolic Acidosis.",
        "The functional stations (Sleds, Burpees, Lunges) induce localized muscular fatigue and vascular occlusion, trapping blood in the extremities. The subsequent run requires the cardiovascular system to not only oxygenate muscles but also redistribute pooled blood and clear metabolic waste products (hydrogen ions and lactate) while maintaining forward velocity.",
        "This training plan is built on the principle of Concurrent Training—the simultaneous development of strength and endurance. The following sections detail the physiological mechanisms targeted in this program."
      ]
    },
    {
      title: "2. The Science of the Running Workouts",
      content: [
        "This program avoids 'junk miles.' Every running session targets a specific energy system and physiological adaptation."
      ],
      subsections: [
        {
          title: "2.1 Zone 2: Long Slow Distance (LSD)",
          focus: "Mitochondrial Biogenesis and Fat Oxidation.",
          mechanism: "Zone 2 training is performed at an intensity where Type I (slow-twitch) muscle fibers are dominant, and lactate production is matched by lactate clearance (below the first ventilatory threshold).",
          whyItMatters: [
            "Mitochondrial Density: Low-intensity volume increases the number and size of mitochondria (the cellular power plants) in muscle cells. More mitochondria allow for greater processing of oxygen during high-intensity efforts.",
            "Capillarization: It promotes the growth of new capillaries (tiny blood vessels) around the muscle, improving oxygen delivery.",
            "Metabolic Flexibility: It teaches the body to preferentially burn fat for fuel, sparing limited glycogen stores for the high-intensity functional stations."
          ]
        },
        {
          title: "2.2 Threshold Intervals (Zone 4)",
          focus: "Lactate Clearance and 'Shuttling.'",
          mechanism: "These runs are performed at or slightly below the Anaerobic Threshold (AnT). At this intensity, lactate is produced rapidly. The goal is not to stop producing lactate, but to improve the body's ability to 'shuttle' it out of the working muscle and use it as a fuel source in the heart and liver (The Cori Cycle).",
          whyItMatters: [
            "In Hyrox, the sleds and lunges spike blood lactate levels. A runner with a high threshold can continue running at a fast pace while their body processes this lactate. A runner with a low threshold will be forced to walk or jog slowly until the acidity subsides. This is the primary differentiator between amateur and elite Hyrox athletes."
          ]
        },
        {
          title: "2.3 VO2 Max Intervals (Zone 5)",
          focus: "Maximum Aerobic Power and Stroke Volume.",
          mechanism: "VO2 Max is the maximum rate at which the heart, lungs, and muscles can effectively use oxygen during exercise. These intervals max out the cardiac output (the amount of blood the heart pumps per minute).",
          whyItMatters: [
            "VO2 Max sets the 'ceiling' of your athletic potential. While you rarely run at 100% VO2 Max in a race, raising your ceiling makes sub-maximal efforts (like Hyrox race pace) feel relatively easier. It increases the 'reserve' you have available for the final push."
          ]
        },
        {
          title: "2.4 Compromised Running",
          focus: "Hemodynamic Redistribution and Neural Drive.",
          mechanism: "'Compromised Running' simulates the physiological shock of the transition zones (The Roxzone). Hemodynamics: Pushing a heavy sled causes blood to pool in the quadriceps (reactive hyperemia). When you begin running immediately after, the heart must work harder to pump that blood out of the legs and back into systemic circulation. This phenomenon causes Cardiac Drift, where heart rate spikes disproportionately to running speed. Neuromuscular Interference: Heavy loading temporarily inhibits the stretch-shortening cycle (SSC) of the tendons, leading to a shorter, 'heavier' stride.",
          whyItMatters: [
            "Training this specifically conditions the baroreceptors (pressure sensors in blood vessels) to adjust blood pressure rapidly, allowing the athlete to return to a normal running gait within 200 meters of leaving a station."
          ]
        }
      ]
    },
    {
      title: "3. Biomechanical Glossary: Understanding the Movements",
      content: [
        "This program utilizes specific drills and movements designed to improve Running Economy—the energy cost of running at a submaximal speed. For a strength athlete, improving economy is often more effective than simply increasing lung capacity."
      ],
      glossary: [
        {
          term: "3.1 Pogo Jumps",
          movement: "Jumping exclusively using the ankles, keeping knees stiff and legs straight.",
          science: "This targets Tendon Stiffness. Running is a series of elastic hops. Stiff tendons (like a tight rubber band) store and return elastic energy more efficiently than loose tendons. Pogo jumps train the Achilles tendon to act as a spring, reducing the metabolic cost of every step."
        },
        {
          term: "3.2 A-Skips & B-Skips",
          movement: "Rhythmic skipping drills focusing on high knee drive (A-Skip) and active pawing at the ground (B-Skip).",
          science: "A-Skips: Reinforce the hip flexor strength required to lift the knee when fatigued. B-Skips: Train the posterior chain (hamstring) to actively pull the ground backward, increasing propulsive force without over-striding."
        },
        {
          term: "3.3 The Metronome Drill",
          movement: "Running while syncing footfall to a specific beat per minute (BPM), typically 170-180.",
          science: "Strength athletes often have a low cadence (fewer steps per minute) with a long, heavy stride. This increases Ground Reaction Force and braking forces, causing higher impact and injury risk. Increasing cadence reduces the load on the knees and hips and improves efficiency."
        },
        {
          term: "3.4 Wall Sit (Weighted)",
          movement: "Holding a static squat position against a wall, often with a weight plate on the lap.",
          science: "This is an Isometric contraction that creates vascular occlusion. It mimics the blood flow restriction experienced during a Sled Push. It is used in this plan to 'pre-fatigue' the legs before a run without causing the eccentric muscle damage of actual heavy lifting."
        },
        {
          term: "3.5 Burpee Broad Jump",
          movement: "Performing a chest-to-floor burpee, then exploding forward into a broad jump instead of a vertical jump.",
          science: "This is a maximum metabolic demand movement. It forces a rapid change in body orientation (horizontal to vertical to horizontal), creating massive spikes in heart rate and oxygen demand. It creates the highest level of 'whole-body' metabolic stress in the training plan."
        },
        {
          term: "3.6 Farmer's Carry",
          movement: "Walking while holding heavy weights in each hand.",
          science: "While this trains grip strength, its primary purpose in this plan is Postural Endurance. Under fatigue, a runner's core often collapses, compressing the diaphragm and restricting breathing. The Farmer's Carry conditions the spinal erectors and obliques to maintain an upright 'pillar' torso, ensuring optimal lung inflation even under heavy load."
        }
      ]
    },
    {
      title: "4. The Role of Tapering (Supercompensation)",
      content: [
        "The final phase of this book involves a 'Taper.' It is critical to understand that training does not make you fitter; recovery does.",
        "Training provides the stimulus (damage), and rest provides the adaptation (growth). During the final two weeks, volume is reduced exponentially while intensity remains high. This process allows glycogen stores to maximize, oxidative enzymes to peak, and the neuromuscular system to fully repair. Skipping the taper or adding extra workouts in the final weeks will scientifically blunt your race-day performance."
      ]
    }
  ]
};

export const chapterTwoContent = {
  title: "Chapter 2: Finding Your Numbers – The 30-Minute Threshold Test",
  subtitle: "Why Guess When You Can Measure?",
  intro: [
    "Most amateur athletes train in the \"Grey Zone.\" They run their easy runs too hard (preventing recovery) and their hard runs too slow (preventing adaptation). To build a Hyrox engine, you need precision.",
    "You cannot follow this program effectively if you don't know where your limits are. We need to find your Anaerobic Threshold.",
    "Your Threshold is the maximum intensity you can sustain for roughly one hour. It is the \"tipping point\" where your body produces lactate faster than it can clear it.",
    "• Run below it: You can go for hours (Aerobic).",
    "• Run above it: You have minutes before your legs fail (Anaerobic).",
    "To find this number, we will use the 30-Minute Field Test."
  ],
  part1: {
    title: "Part 1: The Test Protocol",
    equipment: [
        "A running watch (Garmin, Apple, Coros, etc.) or a Smartphone with a running app.",
        "A Heart Rate Monitor (Chest strap is best, but a tight wrist watch works).",
        "A flat route (track or flat road) or a treadmill (set to 1% incline)."
    ],
    mission: "You are going to run for 30 minutes at the maximum consistent effort you can sustain. This is not a sprint; it is a time trial. If you sprint the first 5 minutes and die, the test is invalid. You want to finish the 30 minutes feeling like you couldn't run another 100 meters at that speed.",
    steps: [
        { title: "1. The Warm-up (15 Minutes)", items: ["5 minutes fast walk.", "10 minutes very slow jog.", "3 x 20-second \"strides\" (accelerate to fast speed, then coast) to wake up your legs.", "Rest for 2 minutes."] },
        { title: "2. The Test (30 Minutes)", items: ["Start your watch. Begin running at a strong, uncomfortable pace.", "THE CRITICAL STEP: At the 10-minute mark, press the \"Lap\" button on your watch. Do not stop running.", "Continue running for the final 20 minutes at the highest possible pace you can hold.", "At the 30-minute mark, stop the watch."] },
        { title: "3. The Cool Down", items: ["Walk or slow jog for 5-10 minutes."] }
    ],
    note: "Why did I hit the \"Lap\" button? The first 10 minutes of a hard run are noisy. Your heart rate is lagging behind your speed (Cardiac Lag), and your adrenaline is high. The final 20 minutes represent your true physiological state."
  },
  part2: {
    title: "Part 2: Extracting Your Data",
    content: [
        "Once you have finished and recovered, look at the data for that specific 20-minute lap (the second part of your run). Do not look at the average for the whole 30 minutes.",
        "Write down your two Key Numbers:",
        "1. Average Heart Rate (Last 20 Mins): This is your Lactate Threshold Heart Rate (LTHR).",
        "2. Average Pace (Last 20 Mins): This is your Threshold Pace (TP)."
    ]
  },
  part3: {
    title: "Part 3: The Calculation Worksheet",
    intro: "Now we will use those two numbers to calculate your training zones for the entire 12-week program.\nNote: Paces are estimates. On hot days or hilly routes, trust Heart Rate and RPE over Pace.",
    zones: [
        {
            name: "Zone 2: The \"Aerobic Base\" Runs",
            usage: "Long Runs, Easy Runs, Recovery Runs.",
            feeling: "RPE 3-4. You can hold a full conversation. Breathing is strictly through the nose.",
            calc: ["Heart Rate: Your LTHR x 0.85.", "Pace: Your TP plus 60 to 90 seconds per km."]
        },
        {
            name: "Zone 4: Threshold Intervals",
            usage: "1km Reps, Tempo Runs, \"Comfortably Hard\" efforts.",
            feeling: "RPE 7-8. You can speak 3 or 4 words at a time, but not a sentence. Burning sensation is manageable.",
            calc: ["Heart Rate: Your LTHR +/- 2 beats.", "Pace: Your Exact Threshold Pace."]
        },
        {
            name: "Zone 5: VO2 Max / Speed Work",
            usage: "400m Reps, 600m Reps, Sprints.",
            feeling: "RPE 9. You cannot talk. You are gasping for air. Legs are burning heavily.",
            calc: ["Heart Rate: N/A (Heart rate lags too much on short sprints. Run on Feel/Pace).", "Pace: Your TP minus 30 to 45 seconds per km."]
        }
    ]
  },
  part4: {
      title: "Part 4: Your Training Cheat Sheet",
      intro: "Fill this out and bookmark this page. You will refer to this for every running workout in the book."
  },
  example: {
      title: "Example Calculation (For Reference)",
      items: [
          "Athlete: John",
          "Test Result: Last 20 mins Avg HR was 170 BPM. Avg Pace was 5:00/km.",
          "Zone 2 HR: 170 x 0.85 = 144 BPM (John stays below 144 on easy runs).",
          "Zone 2 Pace: 5:00 + 1:00 = 6:00/km.",
          "Threshold Pace: 5:00/km.",
          "VO2 Max Pace: 5:00 - 30s = 4:30/km."
      ]
  },
  finalNote: {
      title: "A Final Note on Hyrox Pacing",
      content: [
          "On Race Day, you will not run at your VO2 Max pace (Zone 5), and you will not run at your Zone 2 pace.",
          "Hyrox Race Pace is usually found right between your Zone 2 and Threshold Pace. (Roughly: Threshold Pace + 15-20 seconds per km).",
          "By improving your Threshold Pace in this program, you automatically pull your Hyrox Race Pace up with it. Fast Threshold = Fast Race."
      ]
  }
};

export const trainingPlan: WeekPlan[] = [
  {
    weekNumber: 1,
    title: "Establishing the Baseline",
    phase: "Base Phase",
    days: [
      {
        day: "Day 1",
        title: "Aerobic Power Intervals",
        focus: "VO2max Development (Pulse Initiation). Waking up the cardiovascular system without flooding the legs with lactate yet.",
        warmup: [
          "5 min easy jog (Strict nasal breathing).",
          "Drill: The Metronome. Set app to 170-175 BPM. Run for 2 mins syncing footfall to beat. (Reason: Increase cadence to reduce impact).",
          "2 rounds: 10 Pogo Jumps (stiff knees, bouncing on toes) + 10 Air Squats."
        ],
        mainWorkout: [
          "6 x 400m Run",
          "Pace: Hard but sustainable (Approx. 3k race pace - roughly RPE 8).",
          "Recovery: 90 seconds Slow Jog (Do not walk)."
        ],
        coolDown: [
          "10 min very easy jog.",
          "Static Stretch: Calves and Hamstrings (30s hold each)."
        ],
        coachHint: "The 'Slow Jog' recovery is the secret sauce. If you walk, your heart rate drops too low, and the next interval becomes anaerobic (muscular) rather than aerobic (heart/lungs). Keep the blood moving."
      },
      {
        day: "Day 2",
        title: "Strength Maintenance (Running Economy Focus)",
        focus: "Tendon Stiffness & Neural Drive. We want 'springy' legs, not bulky legs.",
        warmup: [
          "5 min Row (Easy).",
          "Hip Mobility Flow: 90/90 Hip Switches + Pigeon Pose (2 mins total)."
        ],
        mainWorkout: [
          "1. Barbell Back Squats: 3 sets x 5 reps (Heavy - RPE 7, leave 2 reps in tank). Focus: Fast concentric (up) phase.",
          "2. Strict Overhead Press: 3 sets x 8 reps. Focus: Core stability.",
          "3. Romanian Deadlifts (RDLs): 3 sets x 8 reps. Focus: 3-second lowering phase (Eccentric load strengthens hamstrings).",
          "4. Core: 3 rounds of 30s Hollow Hold / 30s Plank."
        ],
        coolDown: [
          "5 min static stretching (Quads/Hip Flexors)."
        ],
        coachHint: "Leave the gym feeling like you could have done more. We are stimulating the nervous system, not destroying muscle fibers. Save your legs for tomorrow."
      },
      {
        day: "Day 3",
        title: "Introduction to Compromised Running",
        focus: "Running with 'Heavy Legs' (Blood Shunting).",
        warmup: [
          "10 min easy jog.",
          "2 rounds: 10 Walking Lunges + 10 High Knees."
        ],
        mainWorkout: [
          "3 Rounds (Continuous Clock):",
          "1. Pre-Fatigue: 60-second Weighted Wall Sit (Hold a plate/dumbbell).",
          "2. Run: 500m (Moderate-Fast).",
          "3. Functional: 30m Sandbag Walking Lunges (Race Weight).",
          "Rest: 2 minutes completely off between rounds."
        ],
        coolDown: [
          "10 min walk + light stretch."
        ],
        coachHint: "The Wall Sit mimics the 'vascular occlusion' (blood trapping) of a heavy sled push. Your legs will feel 'full' of blood when you start running. Force a high cadence immediately on the run to pump that blood back to the heart."
      },
      {
        day: "Day 4",
        title: "Long Slow Distance (LSD)",
        focus: "Fat Oxidation & Capillary Density.",
        warmup: [
          "5 min brisk walk -> into light jog."
        ],
        mainWorkout: [
          "45 minutes Steady Run.",
          "Intensity Rule: Nose Breathing ONLY. If you have to open your mouth to breathe, you are running too fast. Slow down or walk immediately."
        ],
        coolDown: [
          "10 min Foam Rolling (Focus on Quads, IT Band, and Calves)."
        ],
        coachHint: "Strength athletes usually run their 'easy' runs too hard (Zone 3/Junk Miles). The 'Nose Breathing' constraint is non-negotiable. This builds the aerobic floor that supports your high-intensity work."
      }
    ]
  },
  {
    weekNumber: 2,
    title: "Volume Accrual",
    phase: "Base Phase",
    days: [
      {
        day: "Day 1",
        title: "Aerobic Power Intervals (Extended)",
        focus: "Extending Time at VO2max.",
        warmup: [
          "10 min jog.",
          "Drill: 'A-Skips' (rhythm and bounce) - 2 x 20m.",
          "Drill: High Knees - 2 x 15 seconds."
        ],
        mainWorkout: [
          "8 x 400m Run (Volume increased by 33% from Week 1).",
          "Pace: Same as Week 1 (RPE 8).",
          "Recovery: 90 seconds Slow Jog."
        ],
        coolDown: [
          "10 min easy jog."
        ],
        coachHint: "By rep 6, your form will want to break down. Focus on 'pulling' the heel up (using the hamstring) rather than 'pushing' hard off the toes (which blows up the calves). Save your calves for the functional stations."
      },
      {
        day: "Day 2",
        title: "Strength Maintenance (Unilateral Stability)",
        focus: "Single-leg strength to fix imbalances. Running is a series of single-leg hops.",
        warmup: [
          "10 min Air Bike (arm and leg flush).",
          "Glute Activation: 2 x 15 Banded Clamshells."
        ],
        mainWorkout: [
          "1. Deadlifts: 3 sets x 5 reps (Heavy but crisp form).",
          "2. Bulgarian Split Squats: 3 sets x 8 reps per leg. (Essential for preventing Runner's Knee).",
          "3. Pull-Ups: 3 sets x Sub-Max Reps (Strict)."
        ],
        coolDown: [
          "5 min stretch (Focus on Glutes)."
        ],
        coachHint: "If you wobble on the Split Squats, your stabilizers are weak. Stability = Energy Efficiency. A stable runner burns less fuel."
      },
      {
        day: "Day 3",
        title: "Compromised Running (Increased Density)",
        focus: "Lactate Clearance under fatigue.",
        warmup: [
          "10 min easy jog.",
          "Activation: 10 Squat Jumps + 10 Lunges."
        ],
        mainWorkout: [
          "4 Rounds for Time (Volume Up, Rest Down):",
          "1. Pre-Fatigue: 60s Wall Sit (Weighted).",
          "2. Run: 500m (Targeting steady pace).",
          "3. Functional: 30m Sandbag Lunges.",
          "Rest: 90 seconds between rounds (Reduced from 2 mins)."
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "We cut the rest by 30 seconds. This prevents the lactate from fully clearing. You will start Round 3 with 'heavy legs.' This is the specific feeling of the second half of a Hyrox race. Breathe rhythmically during the lunges."
      },
      {
        day: "Day 4",
        title: "Long Slow Distance (Duration +)",
        focus: "Time on Feet.",
        warmup: [
          "5 min walk."
        ],
        mainWorkout: [
          "50-55 minutes Steady Run (Nose Breathing Only)."
        ],
        coolDown: [
          "10 min Foam Roll + Couch Stretch (2 mins per side)."
        ],
        coachHint: "Mentally, this is the hardest session for strength athletes because it feels 'too slow.' Trust the process. You are building capillaries—literally growing new blood vessels to deliver oxygen to your muscles. You cannot rush biology."
      }
    ]
  },
  {
    weekNumber: 3,
    title: "Peak Volume (Phase 1)",
    phase: "Volume Peak",
    context: "This is the hardest week of the block where we push the total workload to its maximum to force adaptation. Theme: 'The Grinds'.",
    days: [
      {
        day: "Day 1",
        title: "Long Intervals (VO2max)",
        focus: "Aerobic Power Endurance. Extending the duration you can hold a high heart rate.",
        warmup: [
          "10 min easy jog.",
          "Drill: 'B-Skips' (pawing at the ground) - 2 x 20m.",
          "Drill: Lateral Shuffles (waking up glute medius) - 2 x 20m."
        ],
        mainWorkout: [
          "5 x 600m Run. (We have increased distance from 400m to 600m).",
          "Pace: 5k Race Pace (Hard, but consistent).",
          "Recovery: 2 minutes Slow Jog (Active Recovery)."
        ],
        coolDown: [
          "10 min easy jog to flush lactate."
        ],
        coachHint: "We extended the distance to 600m. This forces you to spend more time in the 'Red Zone' (VO2max) compared to the 400s. Focus on your breathing rhythm to survive the last 200m."
      },
      {
        day: "Day 2",
        title: "Strength Maintenance (Structural Integrity)",
        focus: "Core stiffness and Grip Strength (vital for the Farmer's Carry and running posture).",
        warmup: [
          "10 min Row (Easy).",
          "Thoracic Mobility (Open Book stretches)."
        ],
        mainWorkout: [
          "1. Front Squats: 3 sets x 5 reps. (Forces upright torso for Wall Balls).",
          "2. Bench Press: 3 sets x 8 reps (Explosive up, slow down).",
          "3. Heavy Farmer's Carry: 3 x 50m. Use heaviest dumbbells/kettlebells you can hold with perfect posture."
        ],
        coolDown: [
          "5 min static stretch (Chest and Hip Flexors)."
        ],
        coachHint: "The Farmer's Carry is a 'moving plank.' If your shoulders roll forward or your hips sway, you are leaking energy. Stay tall."
      },
      {
        day: "Day 3",
        title: "Continuous Compromised (Simulating the Middle Race)",
        focus: "Transitions and recovering while moving.",
        warmup: [
          "10 min easy jog.",
          "Activation: 10 Sprawls (Burpee without pushup) + 10 Air Squats."
        ],
        mainWorkout: [
          "20 min AMRAP (As Many Rounds As Possible):",
          "400m Run",
          "20m Walking Lunges (Bodyweight or very light sandbag)",
          "200m Row (Hard pull)"
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "This workout simulates the 'chaos' of the middle of a Hyrox race. Practice entering and exiting the rower efficiently—strapping in and out takes time."
      },
      {
        day: "Day 4",
        title: "Long Slow Distance (Max Duration)",
        focus: "Max Aerobic Duration.",
        warmup: [
          "5 min brisk walk."
        ],
        mainWorkout: [
          "60 minutes Steady Run (Nose Breathing Only)."
        ],
        coolDown: [
          "15 min deep stretch or Yoga flow."
        ],
        coachHint: "60 minutes is often the 'tipping point' for strength athletes where form collapses. Bring water/electrolytes on this run. Hydrate during the run to practice swallowing fluids while moving."
      }
    ]
  },
  {
    weekNumber: 4,
    title: "Deload & Recovery",
    phase: "Recovery",
    context: "Scientifically essential 'Deload'. Your CNS carries more fatigue than a lightweight runner. We reduce volume to allow your body to absorb training. Theme: 'Active Recovery'.",
    days: [
      {
        day: "Day 1",
        title: "Technical Intervals",
        focus: "Running Economy and Turnover (Cadence).",
        warmup: [
          "10 min jog + Mobility."
        ],
        mainWorkout: [
          "4 x 400m @ Moderate Pace (RPE 7).",
          "Recovery: Full recovery (Walk 2-3 mins until HR is totally normal)."
        ],
        coolDown: [
          "10 min extensive foam rolling."
        ],
        coachHint: "This is not a fitness test. It is technical practice. Run these with the feeling of 'floating.' Use this session to perfect your foot strike (landing under the hips, not in front)."
      },
      {
        day: "Day 2",
        title: "Strength Technique (De-load)",
        focus: "Speed of movement (Bar Speed).",
        warmup: [
          "10 min Bike."
        ],
        mainWorkout: [
          "1. Back Squat: 3 sets x 5 reps @ 50-60% 1RM. Move the weight fast.",
          "2. Strict Press: 3 sets x 5 reps @ 50-60%.",
          "3. Mobility Circuit: 10 mins continuous flow (Hips, Ankles, T-Spine)."
        ],
        coolDown: [
          "N/A (Mobility was the cool down)."
        ],
        coachHint: "Do not be tempted to add weight. We are maintaining the neural pathway (greasing the groove) without creating muscle damage. You should leave the gym feeling significantly better than when you walked in."
      },
      {
        day: "Day 3",
        title: "Skill Work (Aerobic Flush)",
        focus: "Skill acquisition under low heart rate.",
        warmup: [
          "5 min jog."
        ],
        mainWorkout: [
          "30 min EMOM (Every Minute on the Minute):",
          "Minute 1: 150m Run (Easy pace).",
          "Minute 2: 10 Wall Balls (Focus on depth and hitting the target, not speed)."
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "This keeps the blood moving to flush out any residual fatigue from Week 3. It keeps the 'Hyrox movements' fresh in your mind but keeps the intensity strictly in Zone 2."
      },
      {
        day: "Day 4",
        title: "Deep Recovery",
        focus: "Parasympathetic (Rest & Digest) System activation.",
        activity: [
          "Option A: 30 min recovery Swim (breaststroke/easy freestyle).",
          "Option B: 45 min Walk in nature.",
          "Option C: Full Rest Day with a massage or contrast bath (Hot/Cold)."
        ],
        warmup: [],
        mainWorkout: [],
        coolDown: [],
        coachHint: "Recovery is when the fitness actually happens. If you train hard this week, you ruin the next 4 weeks of high-intensity work. Enjoy the rest; you earned it."
      }
    ]
  },
  {
    weekNumber: 5,
    title: "Threshold Building",
    phase: "Intensification Phase",
    context: "We have graduated from the 'Base Phase.' Now we enter Intensification. Physiological Goal: Increase Anaerobic Threshold. Theme: 'The Redline'.",
    days: [
      {
        day: "Day 1",
        title: "Threshold Intervals (Lactate Clearance)",
        focus: "Raising the 'ceiling' of your aerobic speed. Learning to run fast without redlining.",
        warmup: [
          "10 min jog (Progressive: Easy -> Moderate).",
          "Drill: 2 rounds: 20 Pogo Jumps (Stiff ankles) + 10 Forward Lunges.",
          "Priming: 2 x 100m accelerations (build to 80% speed)."
        ],
        mainWorkout: [
          "4 x 1km Run.",
          "Pace: 'Comfortably Hard' (Approx 10k pace / RPE 7-8). You should be able to speak 3-4 words, but not a full sentence.",
          "Recovery: 2 minutes Standing Rest (Let the Heart Rate drop significantly)."
        ],
        coolDown: [
          "10 min very slow jog (The 'Flush')."
        ],
        coachHint: "Unlike Phase 1, we want full recovery here to ensure you hit the specific threshold pace every rep. Consistency is key: Rep 4 should be the same speed as Rep 1."
      },
      {
        day: "Day 2",
        title: "Strength & Power (Rate of Force Development)",
        focus: "Explosive Power. Converting your raw strength into speed.",
        warmup: [
          "10 min Air Bike.",
          "Activation: 3 rounds: 5 Box Jumps (Step down) + 5 Kettlebell Swings."
        ],
        mainWorkout: [
          "1. Deadlifts: 3 sets x 4 reps (High speed up). Weight roughly 75-80% 1RM.",
          "2. Box Jumps: 3 sets x 8 reps (Focus on soft landing and immediate rebound).",
          "3. Dumbbell Rows: 3 sets x 10 reps/arm (Heavy)."
        ],
        coolDown: [
          "5 min stretch (Hamstrings/Lower Back)."
        ],
        coachHint: "Plyometrics (Box Jumps) are crucial for the 'Heavy Runner.' They improve ground contact time, making you a 'bouncier,' more efficient runner."
      },
      {
        day: "Day 3",
        title: "Heavy Compromised Circuit",
        focus: "The 'Sled Effect' (Simulating the first half of Hyrox).",
        warmup: [
          "10 min jog.",
          "Hip Openers (Spidermen stretch)."
        ],
        mainWorkout: [
          "3 Rounds for Time:",
          "800m Run (Targeting Hyrox Race Pace).",
          "25m Sled Push (Race Weight) OR 90s Weighted Wall Sit + 10 Squat Jumps (if no sled access).",
          "Rest: 2 minutes between rounds."
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "The heavy push/sit creates local muscle toxicity (burning quads). Running immediately after forces the body to flush that toxicity. It will hurt. Embrace it."
      },
      {
        day: "Day 4",
        title: "Long Run",
        focus: "Aerobic Capacity Maintenance.",
        warmup: [
          "5 min walk."
        ],
        mainWorkout: [
          "65 minutes @ Zone 2 (Strict Nose Breathing)."
        ],
        coolDown: [
          "10 min Foam Roll."
        ],
        coachHint: "We added 5 minutes. Keep the discipline. If your legs are sore from the Sled work yesterday, this run is the best way to recover. Active blood flow heals muscle faster than sitting on the couch."
      }
    ]
  },
  {
    weekNumber: 6,
    title: "Increasing Density",
    phase: "Intensification Phase",
    days: [
      {
        day: "Day 1",
        title: "Extended Threshold",
        focus: "Mental & Physiological Endurance. Holding the threshold pace for longer.",
        warmup: [
          "10 min jog + Plyometrics (High Knees/Butt Kicks)."
        ],
        mainWorkout: [
          "3 x 1.5km Run @ Threshold Pace. (Same pace as last week's 1km).",
          "Recovery: 2 minutes Standing Rest."
        ],
        coolDown: [
          "10 min jog."
        ],
        coachHint: "1.5km is long enough for the mind to wander. Stay engaged. The tendency is to slow down in the middle 500m. Don't let the pace slip."
      },
      {
        day: "Day 2",
        title: "Strength & Power (Unilateral)",
        focus: "Unilateral Leg Power (Driving out of the hole).",
        warmup: [
          "10 min Row.",
          "Glute Bridges (Single leg)."
        ],
        mainWorkout: [
          "1. Back Squat: 3 sets x 4 reps (Explosive).",
          "2. Weighted Step-Ups: 3 sets x 8 reps/leg (Box height at knee level). Drive through the heel, stand tall.",
          "3. Push Press: 3 sets x 8 reps (Use leg drive to save shoulders)."
        ],
        coolDown: [
          "5 min stretch (Quads)."
        ],
        coachHint: "Step-ups are the closest strength movement to running mechanics and the box step-over station. Do not push off with the back foot; pull yourself up with the front leg."
      },
      {
        day: "Day 3",
        title: "\"The Burpee Broad Jump\" Effect",
        focus: "Total Body Metabolic Stress & Recovery.",
        warmup: [
          "10 min jog.",
          "5 Burpees + 10 Air Squats to prime."
        ],
        mainWorkout: [
          "30 min AMRAP:",
          "500m Run (Fast).",
          "15 Burpee Broad Jumps.",
          "500m Run (Fast).",
          "20 Wall Balls."
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "Burpee Broad Jumps spike the Heart Rate higher than almost anything else. Recover your breath during the first 200m of the run, not before starting it. Start running immediately, even if it's slow."
      },
      {
        day: "Day 4",
        title: "Long Run",
        focus: "Aerobic Duration.",
        warmup: [
          "5 min walk."
        ],
        mainWorkout: [
          "70 minutes @ Zone 2 (Strict Nose Breathing)."
        ],
        coolDown: [
          "15 min stretching/mobility."
        ],
        coachHint: "You are now halfway through the program. Fatigue is accumulating. Prioritize sleep tonight (8+ hours). This run flushes the metabolic waste from the Burpee Broad Jumps."
      }
    ]
  },
  {
    weekNumber: 7,
    title: "Peak Intensity (Phase 2)",
    phase: "Overreach Phase",
    context: "Peak Intensity week. The 'Overreach' week where we push intensity and volume to the limit. Theme: 'The Dress Rehearsal'.",
    days: [
      {
        day: "Day 1",
        title: "Speed Play (Anaerobic Capacity)",
        focus: "Max Velocity & Leg Turnover. Teaching the heavy athlete to move limbs fast when tired.",
        warmup: [
          "10 min jog.",
          "Drill: 'High Knees' -> 'Butt Kicks' -> 'Sprints' (3 rounds of 20m).",
          "Drill: Leg Swings to open hips."
        ],
        mainWorkout: [
          "10 x 400m Sprints.",
          "Pace: Faster than 5k pace (RPE 9). This should feel 'fast' and aggressive.",
          "Recovery: 60 seconds Standing Rest (Incomplete Recovery)."
        ],
        coolDown: [
          "10 min very slow jog."
        ],
        coachHint: "The short rest is the weapon here. 60 seconds is not enough time to fully recover. By rep 7, your legs will burn with lactate. You must hold your form even when your muscles are screaming."
      },
      {
        day: "Day 2",
        title: "Strength Maintenance (CNS Priming)",
        focus: "Maintaining strength without inducing hypertrophy or fatigue.",
        warmup: [
          "10 min Row/Ski.",
          "Thoracic rotation drills."
        ],
        mainWorkout: [
          "1. Back Squat: 3 sets x 3 reps @ 80-85%. (Heavy, but low reps).",
          "2. Deadlift: 3 sets x 3 reps @ 80-85%.",
          "3. Strict Press: 3 sets x 5 reps."
        ],
        coolDown: [
          "10 min stretching."
        ],
        coachHint: "Keep the volume low (Total reps per exercise = 9). We want to keep the nervous system firing (Heavy weight) but avoid muscle damage (Low reps). Do not go to failure."
      },
      {
        day: "Day 3",
        title: "Simulation Circuit (The \"Half Hyrox\")",
        focus: "Race Rehearsal. Managing the transitions.",
        warmup: [
          "10 min jog.",
          "Practice one round of the circuit at 50% speed."
        ],
        mainWorkout: [
          "For Time:",
          "1km Run",
          "1km Ski Erg (or 1000m Row if no Ski)",
          "1km Run",
          "50m Sled Push (Race Weight) OR (2 min Wall Sit + 20 Lunges)",
          "1km Run",
          "50m Sled Pull (Race Weight) OR (2 min Heavy Farmers Carry)"
        ],
        coolDown: [
          "15 min stretch."
        ],
        coachHint: "Wear your race shoes. Practice your hydration. This is a dress rehearsal. Pay attention to how your legs feel coming off the Ski Erg and Sleds. The first 200m of every run is about emotional control: do not panic, find your rhythm."
      },
      {
        day: "Day 4",
        title: "Long Run",
        focus: "Aerobic Ceiling.",
        warmup: [
          "5 min walk."
        ],
        mainWorkout: [
          "75 minutes @ Zone 2 (Strict Nose Breathing)."
        ],
        coolDown: [
          "10 min Foam Roll."
        ],
        coachHint: "This is your longest run of the block. You are tired from the simulation yesterday. That is the point. Running on tired legs teaches your body to burn fat as fuel when glycogen is depleted."
      }
    ]
  },
  {
    weekNumber: 8,
    title: "Deload (Recovery)",
    phase: "Recovery",
    context: "Fatigue Shedding & Adaptation. Where the magic happens—repair and supercompensation. Theme: 'Rest is a Weapon'.",
    days: [
      {
        day: "Day 1",
        title: "Moderate Intervals (The Flush)",
        focus: "Blood flow without central nervous system stress.",
        warmup: [
          "10 min jog + Mobility."
        ],
        mainWorkout: [
          "4 x 800m Run.",
          "Pace: Moderate (RPE 6-7). Just finding a rhythm.",
          "Recovery: 2-3 mins Walk (Full recovery)."
        ],
        coolDown: [
          "10 min stretching."
        ],
        coachHint: "You will feel like you want to run faster because you are fit. Do not. Hold back. We are just keeping the engine ticking over."
      },
      {
        day: "Day 2",
        title: "Strength Technique (Light Loads)",
        focus: "Movement Quality.",
        warmup: [
          "10 min Bike."
        ],
        mainWorkout: [
          "1. Squat / Press / Hinge: 3 sets x 5 reps @ 50% 1RM.",
          "2. Core Circuit: Deadbugs, Bird-Dogs, Side Planks. Focus on stability."
        ],
        coolDown: [
          "15 min foam rolling."
        ],
        coachHint: "Move the bar perfectly. Visualize your race day strength. No grinding reps."
      },
      {
        day: "Day 3",
        title: "Active Recovery / Mobility",
        focus: "Joint Health.",
        warmup: ["N/A"],
        mainWorkout: [
          "20 min Easy Run (Very slow, conversation pace).",
          "20 min Mobility Flow (Yoga or stretching routine)."
        ],
        coolDown: ["N/A"],
        coachHint: "If you have any 'niggles' (tight calves, sore achilles), this is the time to address them. Ice, massage, or extra sleep."
      },
      {
        day: "Day 4",
        title: "Rest Day",
        focus: "Mental Reset.",
        activity: [
          "Completely OFF.",
          "Go for a casual walk if you must, but no training gear."
        ],
        warmup: [],
        mainWorkout: [],
        coolDown: [],
        coachHint: "Eat high-quality food. Hydrate. Visualize the next 4 weeks. Phase 3 is where we sharpen the axe for race day. You need to enter Week 9 feeling 100% fresh."
      }
    ]
  },
  {
    weekNumber: 9,
    title: "Race Pace Injection (Phase 3)",
    phase: "Specificity & Taper",
    context: "We have entered Phase 3: Specificity & Taper. Physiological Goal: Neuromuscular Priming. Theme: 'Precision' – No junk miles, no wasted reps.",
    days: [
      {
        day: "Day 1",
        title: "Race Pace Intervals",
        focus: "Pace Perception. Teaching the brain exactly what Race Pace feels like when fresh vs. fatigued.",
        warmup: [
          "10 min jog.",
          "Drill: 2 x 100m 'Striders' (Accelerate to race pace, hold for 10 strides, relax)."
        ],
        mainWorkout: [
          "4 x 1km Run.",
          "Pace: Exact Goal Race Pace. (e.g., if you want a 4:30/km average, hit 4:30. Not 4:15).",
          "Recovery: 90 seconds Standing Rest."
        ],
        coolDown: [
          "10 min jog."
        ],
        coachHint: "The trap here is going too fast because you just had a deload week. Do not go faster than race pace. Discipline > Ego."
      },
      {
        day: "Day 2",
        title: "Strength Maintenance (Preservation)",
        focus: "Maintaining neural drive without soreness.",
        warmup: [
          "10 min Bike.",
          "Dynamic Stretching (Arm circles, leg swings)."
        ],
        mainWorkout: [
          "1. Back Squat (or Deadlift): 3 sets x 3 reps @ RPE 7 (Heavy, but moved fast).",
          "2. Pull-Ups: 3 sets x 5 reps (Explosive).",
          "3. Farmers Carry: 3 x 30m (Race Weight)."
        ],
        coolDown: [
          "10 min stretching."
        ],
        coachHint: "You should leave the gym feeling 'tight and springy,' not 'smashed.' If the bar feels slow, drop the weight by 10%."
      },
      {
        day: "Day 3",
        title: "The Finisher (Wall Balls & Lunges)",
        focus: "Running on 'Jelly Legs' (The end of the race).",
        warmup: [
          "10 min jog.",
          "Prime: 10 Wall Balls + 10 Lunges (Light)."
        ],
        mainWorkout: [
          "4 Rounds for Time:",
          "600m Run (Targeting Race Pace).",
          "25 Wall Balls (Race Weight - hit the target every time).",
          "25m Walking Lunges (Race Weight Sandbag).",
          "Rest: No scheduled rest. Transition as fast as possible."
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "The race ends with Wall Balls. Practicing running into them and lunging after them is crucial. On the run, focus on a quick turnover—your quads will be fried, so use your arms to drive the pace."
      },
      {
        day: "Day 4",
        title: "Moderate Run (Gut Check)",
        focus: "Digestive System Training.",
        warmup: [
          "5 min walk."
        ],
        mainWorkout: [
          "50 minutes @ Zone 2.",
          "Constraint: Consume your race-day fuel (Gel or Carbs) at minute 25."
        ],
        coolDown: [
          "10 min Foam Roll."
        ],
        coachHint: "We are testing your stomach. Can you digest carbs while running with an elevated heart rate? If you get a stitch or cramps today, change your fuel source now, not on race day."
      }
    ]
  },
  {
    weekNumber: 10,
    title: "The Last Hard Push",
    phase: "Specificity & Taper",
    days: [
      {
        day: "Day 1",
        title: "Mixed Intervals (The \"Kick\")",
        focus: "Changing gears under fatigue.",
        warmup: [
          "10 min jog + Dynamic Drills."
        ],
        mainWorkout: [
          "2 Sets of the following Ladder:",
          "1km Run (Race Pace) -> Rest 2 mins.",
          "800m Run (10-15s faster than Race Pace) -> Rest 90s.",
          "400m Run (Sprint / Closing Speed) -> Rest 3 mins."
        ],
        coolDown: [
          "10 min easy jog."
        ],
        coachHint: "Simulates the need to 'kick' at the end of the race or surge past a competitor. The 1km settles the rhythm, the 800m pushes the threshold, and the 400m empties the tank."
      },
      {
        day: "Day 2",
        title: "Strength (Taper Initiation)",
        focus: "High Intensity, Very Low Volume.",
        warmup: [
          "10 min Row."
        ],
        mainWorkout: [
          "1. Main Compound Lift (Squat/Deadlift): 3 sets x 2 reps. High weight (85-90%), but very few reps.",
          "2. Accessory: Bodyweight Plyometrics (Broad Jumps, Box Jumps) - 3 sets x 5 reps."
        ],
        coolDown: [
          "15 min Mobility."
        ],
        coachHint: "We are keeping the 'Ferrari Engine' tuned up. High weight keeps the nervous system alert. Low reps prevent muscle tearing."
      },
      {
        day: "Day 3",
        title: "Compromised \"Shark Week\"",
        focus: "Total System Overload. This is the hardest workout of the plan.",
        warmup: [
          "10 min jog.",
          "Practice 1 rep of each station."
        ],
        mainWorkout: [
          "5 Rounds for Time:",
          "1km Run.",
          "Alternate Station per round:",
          "Round 1: 1000m Ski Erg.",
          "Round 2: 50m Sled Push (Heavy).",
          "Round 3: 50m Sled Pull (Heavy).",
          "Round 4: 80m Burpee Broad Jumps.",
          "Round 5: 1000m Row.",
          "Intensity: High (Race Effort)."
        ],
        coolDown: [
          "10 min walk + 10 min static stretch."
        ],
        coachHint: "This is the peak of the mountain. It will hurt. You will want to quit in Round 4. Don't. Visualize the finish line. Once you finish this session, the hard work is done. The rest is just polishing."
      },
      {
        day: "Day 4",
        title: "Easy Run (Volume Taper)",
        focus: "Recovery & Flushing.",
        warmup: [
          "5 min walk."
        ],
        mainWorkout: [
          "40 minutes @ Zone 2."
        ],
        coolDown: [
          "10 min Foam Roll."
        ],
        coachHint: "We have reduced the volume from 50 mins to 40 mins. Trust the taper. You might feel 'anxious' that you aren't doing enough. That is normal. Your body is healing and getting stronger."
      }
    ]
  },
  {
    weekNumber: 11,
    title: "Beginning the Taper",
    phase: "Taper",
    context: "Volume Reduction: ~40-50% drop. Intensity: Remains HIGH (Race Pace), but duration is short.",
    days: [
      {
        day: "Day 1",
        title: "Race Pace Checks",
        focus: "Confidence & Rhythm. Confirming your race pace feels 'easy' when fresh.",
        warmup: [
          "10 min jog.",
          "Drill: 2 x 20 sec accelerations to wake up the CNS."
        ],
        mainWorkout: [
          "3 x 1km Run @ Exact Race Pace.",
          "Recovery: 3 minutes Walk/Rest (Full Recovery)."
        ],
        coolDown: [
          "10 min easy jog."
        ],
        coachHint: "You should finish this feeling like you could do 10 more reps. Do not do them. Leave the track feeling fresh, sharp, and hungry."
      },
      {
        day: "Day 2",
        title: "Strength (De-load & Mobility)",
        focus: "Mobility and Tissue Quality. Removing spinal compression.",
        warmup: [
          "10 min Row (Easy)."
        ],
        mainWorkout: [
          "1. Bodyweight Circuit: 3 rounds of 10 Air Squats, 10 Pushups, 10 Ring Rows. Move perfectly.",
          "2. Core: 3 rounds of 30s Planks.",
          "3. Deep Mobility: 20 mins focusing on Hips (Pigeon Pose) and Thoracic Spine."
        ],
        coolDown: [
          "N/A."
        ],
        coachHint: "No heavy bars this week. We want your nervous system to recharge. Heavy lifting taxes the CNS significantly; we need that energy for Race Day."
      },
      {
        day: "Day 3",
        title: "Short Compromised (The \"Pop\")",
        focus: "Neuromuscular Priming. Keeping the body familiar with the transition from running to function, but without the fatigue.",
        warmup: [
          "10 min jog."
        ],
        mainWorkout: [
          "2 Rounds (Not for time, but moving with intent):",
          "500m Run (Race Pace).",
          "20m Walking Lunges (Race Weight).",
          "500m Run (Race Pace).",
          "200m Row (Race Pace)."
        ],
        coolDown: [
          "10 min walk."
        ],
        coachHint: "This is just to keep the 'rust' off. Do not grind. You should not be out of breath at the end of this."
      },
      {
        day: "Day 4",
        title: "Shakeout Run",
        focus: "Blood flow.",
        warmup: [
          "N/A."
        ],
        mainWorkout: [
          "30 min Jog.",
          "Pace: Very Easy (Zone 1/2)."
        ],
        coolDown: [
          "10 min extensive stretching."
        ],
        coachHint: "Visualize the race while you run. Visualize the start line, the sleds, and the finish. Positive visualization primes the brain for success."
      }
    ]
  },
  {
    weekNumber: 12,
    title: "Race Week",
    phase: "Race Week",
    context: "Volume Reduction: ~70-80% drop. Goal: Arrive at the start line vibrating with energy.",
    days: [
      {
        day: "Day 1 (Monday)",
        title: "Active Recovery",
        focus: "Fluid movement.",
        activity: ["30 min Walk or very light Swim."],
        warmup: [],
        mainWorkout: [],
        coolDown: [],
        coachHint: "Drink water. Electrolyte loading starts now. Ensure you are well-hydrated days before the race, not just the morning of."
      },
      {
        day: "Day 2 (Tuesday)",
        title: "Priming Run",
        focus: "Tuning up the engine. The last time you will sweat significantly.",
        warmup: [
          "10 min jog."
        ],
        mainWorkout: [
          "20 min Easy Run.",
          "Then: 4 x 30sec Accelerations (Open up the stride, hit 90% speed, then coast)."
        ],
        coolDown: [
          "5 min walk."
        ],
        coachHint: "These accelerations are called 'strides.' They wake up fast-twitch fibers without creating lactate. You want to feel 'fast.'"
      },
      {
        day: "Day 3 (Wednesday)",
        title: "Skill Touch",
        focus: "Movement Patterning.",
        warmup: [],
        mainWorkout: [
          "3 Rounds (Low Intensity):",
          "10 Wall Balls (Focus on squat depth and throw height).",
          "50m Farmer Carry (Focus on grip and posture)."
        ],
        coolDown: [],
        coachHint: "Do not tire yourself out. Just touch the equipment so the body remembers the patterns."
      },
      {
        day: "Day 4 (Thursday)",
        title: "REST & LOAD",
        focus: "Glycogen Supercompensation.",
        activity: [
          "REST. No training.",
          "Nutrition: Increase Carbohydrate intake today. Pasta, rice, potatoes."
        ],
        warmup: [],
        mainWorkout: [],
        coolDown: [],
        coachHint: "Sleep as much as possible. The sleep you get tonight (two nights out) is more important than the sleep the night before the race."
      },
      {
        day: "Day 5 (Friday)",
        title: "The Shakeout",
        focus: "Nerves management.",
        activity: ["10-15 min very easy jog. Just to calm the nerves and check your shoelaces."],
        warmup: [],
        mainWorkout: [],
        coolDown: [],
        coachHint: "Check your gear. Timing chip, wristbands, shoes. Pack your bag tonight."
      },
      {
        day: "Day 6/7",
        title: "RACE DAY",
        focus: "EXECUTION.",
        warmup: [
          "Race Day Warm-up Protocol (Start 45 mins before heat time):",
          "1. 5 mins: Light Jog (increase body temp).",
          "2. 5 mins: Dynamic Stretching (Leg swings, lunges with rotation).",
          "3. Activation: 2 rounds of 10 Air Squats + 10 Sprawls/Burpees.",
          "4. Priming: 2 x 50m hard runs (Race pace or slightly faster).",
          "5. 10 mins before start: Enter the pen. Stay warm. Keep moving."
        ],
        mainWorkout: [],
        coolDown: [],
        coachHint: "Run your own race. Do not get baited into sprinting the first 1km. Trust your Zone 2 training. Stay calm on the sleds. And when you hit the Wall Balls at the end... empty the tank. Good luck."
      }
    ]
  }
];