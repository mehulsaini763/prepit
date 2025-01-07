import Image from "next/image";
import { Typography } from "@/components/material-tailwind/components";

const Article1 = () => (
  <section class="flex flex-col gap-8 max-w-4xl mx-auto p-6 bg-transparent rounded-lg">
    <Typography variant="h2">Can Yoga Help in Cracking the CAT?</Typography>
    <Image
      src="/assets/padmasana.png"
      width={500}
      height={500}
      className="w-full h-72 object-contain"
    />
    <Typography variant="h4" class="text-xl font-semibold mb-4">
      Optimizing Brain Function for CAT Exam Success
    </Typography>
    <Typography variant="paragraph">
      Discover how understanding the brain regions involved in different CAT
      exam sections can enhance your preparation strategy. Learn which parts of
      the brain are engaged during Quantitative Ability, Logical Reasoning, Data
      Interpretation, and Verbal Ability, and how to optimize your study
      techniques accordingly.
    </Typography>
    <Typography variant="h4">
      Brain Regions Involved in Different CAT Exam Sections
    </Typography>
    <ul class="list-disc">
      <li>
        <Typography variant="paragraph">
          <Typography variant="h6">Quantitative Ability (QA):</Typography>{" "}
          Parietal Lobes, Frontal Lobes
        </Typography>
      </li>
      <li>
        <Typography variant="paragraph">
          <Typography variant="h6">Logical Reasoning (LR):</Typography> Frontal
          Lobes, Parietal Lobes
        </Typography>
      </li>
      <li>
        <Typography variant="paragraph">
          <Typography variant="h6">Data Interpretation (DI):</Typography>{" "}
          Occipital Lobes, Parietal Lobes, Frontal Lobes
        </Typography>
      </li>
      <li>
        <Typography variant="paragraph">
          <Typography variant="h6">
            Verbal Ability and Reading Comprehension (VARC):
          </Typography>
          Temporal Lobes, Frontal Lobes, Parietal Lobes
        </Typography>
      </li>
    </ul>
    <Typography variant="h4">
      Optimizing Your Preparation Based on Brain Function
    </Typography>
    <ul class="list-disc">
      <li>
        <Typography variant="paragraph">Practice Diverse Problems</Typography>
      </li>
      <li>
        <Typography variant="paragraph">Visual Aids for DI</Typography>
      </li>
      <li>
        <Typography variant="paragraph">
          Mathematical Practice for QA
        </Typography>
      </li>
      <li>
        <Typography variant="paragraph">Language Exercises for VARC</Typography>
      </li>
      <li>
        <Typography variant="paragraph">Logical Puzzles for LR</Typography>
      </li>
    </ul>
  </section>
);

const Article2 = () => (
  <section class="flex flex-col gap-8 max-w-4xl mx-auto p-6 bg-transparent rounded-lg">
    <Typography variant="h2">Can Yoga Help in Cracking the CAT?</Typography>
    <Typography variant="h4">
      Yoga Asanas for Activating Different Parts of the Brain
    </Typography>
    <Typography variant="paragraph">
      Yoga is known for its holistic benefits, including enhancing brain
      function. Specific yoga asanas can stimulate and activate different parts
      of the brain, improving cognitive abilities, concentration, and mental
      clarity. Here are some yoga asanas recommended for activating the regions
      of the brain involved in the CAT exam sections:
    </Typography>
    <ol class="list-decimal space-y-4">
      <li className="space-y-4">
        <Typography variant="lead">
          Parietal Lobes (Numerical and Spatial Reasoning)
        </Typography>
        <Typography variant="h6">Trikonasana (Triangle Pose)</Typography>
        <Image
          src="/assets/trikonasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Enhances balance,
              concentration, and spatial awareness.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Stand with your
              legs wide apart. Turn your right foot out, extend your arms to the
              sides, and bend sideways to touch your right hand to your right
              ankle while the left arm reaches up. Hold and repeat on the other
              side.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">Vrksasana (Tree Pose)</Typography>
        <Image
          src="/assets/Picture2.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Improves balance,
              focus, and spatial orientation.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Stand on one leg,
              placing the sole of the other foot on the inner thigh or calf.
              Join your hands in a prayer position at your chest. Hold and
              switch legs.
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          Frontal Lobes (Logical Thinking, Planning, Problem-Solving)
        </Typography>
        <Typography variant="h6">Vrikshasana (Tree Pose)</Typography>

        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Enhances focus,
              concentration, and mental stability.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Stand on one leg
              with the other foot placed on the inner thigh. Balance and bring
              your hands together in a prayer position.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">Garudasana (Eagle Pose)</Typography>
        <Image
          src="/assets/garudasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Improves
              concentration, balance, and coordination.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Stand with your
              knees slightly bent, cross your right thigh over the left, and
              hook your right foot around your left calf. Extend your arms
              forward, cross them at the elbows, and bring your palms together.
              Hold and switch sides.
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          Temporal Lobes (Language, Vocabulary, Comprehension)
        </Typography>
        <Typography variant="h6">
          Sukhasana (Easy Pose) with Nadi Shodhana (Alternate Nostril Breathing)
        </Typography>
        <Image
          src="/assets/sukhasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Calms the mind,
              balances brain hemispheres, and improves cognitive function.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Sit comfortably
              in Sukhasana. Use your right thumb to close your right nostril and
              inhale through the left nostril. Close the left nostril with your
              ring finger and exhale through the right nostril. Continue
              alternating.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">
          Padmasana (Lotus Pose) with Bhramari Pranayama (Bee Breathing)
        </Typography>
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Enhances
              concentration, reduces stress, and improves mental clarity.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Sit in Padmasana.
              Close your ears with your thumbs, place your index fingers on your
              forehead, and the rest of your fingers over your eyes. Inhale
              deeply and exhale while making a humming sound like a bee.
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          Occipital Lobes (Visual Processing)
        </Typography>
        <Typography variant="h6">Shirshasana (Headstand)</Typography>
        <Image
          src="/assets/Shirshasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Improves blood
              circulation to the brain, enhancing visual processing and overall
              brain function.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Kneel down and
              interlace your fingers. Place the top of your head on the ground
              and your hands around the back of your head. Lift your hips and
              walk your feet towards your head. Slowly lift your legs up to come
              into a headstand. Hold and breathe steadily.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">
          Adho Mukha Svanasana (Downward-Facing Dog){" "}
        </Typography>
        <Image
          src="/assets/Picture1.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Increases blood
              flow to the brain, enhancing visual processing and cognitive
              function.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Start on your
              hands and knees. Lift your hips up and back, straightening your
              legs and arms to form an inverted V-shape. Hold and breathe
              deeply.
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          General Brain Activation and Stress Relief
        </Typography>
        <Typography variant="h6">Balasana (Child's Pose)</Typography>
        <Image
          src="/assets/Balasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Calms the mind,
              relieves stress, and enhances mental clarity.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Kneel on the
              floor, sit back on your heels, and lower your torso forward to
              rest your forehead on the ground. Extend your arms forward or
              alongside your body.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">Setu Bandhasana (Bridge Pose)</Typography>
        <Image
          src="/assets/Bandhasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Improves blood
              circulation to the brain, reduces stress, and enhances cognitive
              function.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Lie on your back
              with your knees bent and feet flat on the ground. Lift your hips
              up while keeping your shoulders and head on the floor. Clasp your
              hands under your back and hold.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">Sarvangasana (Shoulder Stand)</Typography>
        <Image
          src="/assets/Sarvangasana.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">Benefits:</Typography> Enhances blood
              flow to the brain, improves focus, and reduces stress.
            </Typography>
          </li>
          <li>
            <Typography variant="paragraph">
              <Typography variant="h6">How to Do:</Typography> Lie on your back,
              lift your legs and hips up, supporting your back with your hands.
              Align your legs and body vertically, and hold the position while
              breathing steadily.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6">Conclusion</Typography>
        <Typography variant="paragraph">
          Incorporating these yoga asanas into your daily routine can
          significantly enhance brain function and cognitive abilities, which
          are crucial for excelling in the CAT exam. Practice these poses
          regularly to improve focus, reduce stress, and boost overall mental
          clarity. Combine yoga with a well-structured study plan, and you’ll be
          better equipped to tackle the challenges of the CAT exam with a calm
          and focused mind.
        </Typography>
      </li>
    </ol>
  </section>
);

const Article3 = () => (
  <section class="flex flex-col gap-8 max-w-4xl mx-auto p-6 bg-transparent rounded-lg">
    <Typography variant="h2">Can Yoga Help in Cracking the CAT?</Typography>
    <Typography variant="paragraph">
      While you can’t do the yoga asanas in the exam hall, you can definitely
      practice them on a daily basis and for the exam day, you can activate the
      different parts of the brain using simple breathing exercises as follows:
    </Typography>
    <Typography variant="paragraph">
      Breathing exercises can effectively aid in activating and enhancing brain
      function, which can be beneficial for CAT exam preparation. Here’s how
      different breathing techniques can stimulate specific brain regions
      relevant to the CAT exam sections:
    </Typography>
    <ol class="list-decimal space-y-4">
      <li className="space-y-4">
        <Typography variant="lead">
          Alternate Nostril Breathing (Nadi Shodhana)
        </Typography>
        <Typography variant="h6">Trikonasana (Triangle Pose)</Typography>
        <Image
          src="/assets/nadi.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <Typography variant="h6">Benefits:</Typography>
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="h6">Brain Activation: </Typography>
            <Typography variant="paragraph">
              Nadi Shodhana balances the left and right hemispheres of the
              brain, enhancing cognitive function and mental clarity.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Stress Reduction: </Typography>
            <Typography variant="paragraph">
              It calms the mind, reduces anxiety, and improves focus, which is
              beneficial during intense study sessions and exam preparation.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Enhanced Concentration: </Typography>
            <Typography variant="paragraph">
              By promoting deep, rhythmic breathing, this technique helps
              improve concentration and memory retention.
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          Bhramari Pranayama (Bee Breathing)
        </Typography>
        <Typography variant="h6">Trikonasana (Triangle Pose)</Typography>
        <Image
          src="/assets/Bhramari.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <Typography variant="h6">Benefits:</Typography>
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="h6">Brain Stimulation: </Typography>
            <Typography variant="paragraph">
              Bhramari Pranayama involves producing a humming sound while
              exhaling, which stimulates the hypothalamus and pituitary glands.
              These glands play a crucial role in regulating brain function,
              including memory and emotional responses.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Stress Relief: </Typography>
            <Typography variant="paragraph">
              The humming sound and controlled breathing pattern induce a
              calming effect on the nervous system, reducing stress and
              promoting relaxation.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Improved Focus: </Typography>
            <Typography variant="paragraph">
              Regular practice of Bhramari Pranayama enhances focus and mental
              clarity, making it easier to absorb and retain information.
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          Kapalabhati Pranayama (Skull-Shining Breath){" "}
        </Typography>
        <Typography variant="h6">Trikonasana (Triangle Pose)</Typography>
        <Image
          src="/assets/Kapalabhati.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <Typography variant="h6">Benefits:</Typography>
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="h6">Increased Oxygen Supply: </Typography>
            <Typography variant="paragraph">
              Kapalabhati Pranayama involves rapid, forceful exhalations
              followed by passive inhalations. This process increases oxygen
              supply to the brain, enhancing alertness and mental agility.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Energy Boost: </Typography>
            <Typography variant="paragraph">
              The dynamic nature of this technique revitalizes the body and
              mind, providing an energy boost that can be beneficial during long
              study sessions.
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Enhanced Brain Function: </Typography>
            <Typography variant="paragraph">
              Regular practice of Kapalabhati Pranayama improves overall brain
              function, including concentration, decision-making, and
              problem-solving abilities.{" "}
            </Typography>
          </li>
        </ul>
      </li>
      <li className="space-y-4">
        <Typography variant="lead">
          Deep Diaphragmatic Breathing (Full Yogic Breath){" "}
        </Typography>
        <Typography variant="h6">Trikonasana (Triangle Pose)</Typography>
        <Image
          src="/assets/Kapalabhati.png"
          width={500}
          height={500}
          className="w-full object-contain max-h-72"
        />
        <Typography variant="h6">Benefits:</Typography>
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="h6">Relaxation Response: </Typography>
            <Typography variant="paragraph">
              Deep diaphragmatic breathing triggers the parasympathetic nervous
              system, promoting relaxation and reducing stress levels.{" "}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Improved Oxygenation: </Typography>
            <Typography variant="paragraph">
              By filling the lungs completely, this technique enhances
              oxygenation of the blood, which nourishes the brain and supports
              cognitive function.{" "}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Mental Clarity: </Typography>
            <Typography variant="paragraph">
              The calming effect of deep breathing helps clear the mind, improve
              focus, and enhance mental clarity, preparing you for effective
              study and exam performance.
            </Typography>
          </li>
        </ul>
        <Typography variant="lead">
          Incorporating Breathing Exercises into CAT Exam Preparation{" "}
        </Typography>
        <ul className="list-disc space-y-4">
          <li>
            <Typography variant="h6">Preparation Routine: </Typography>
            <Typography variant="paragraph">
              Practice breathing exercises regularly as part of your study
              routine to maintain mental clarity and manage stress levels.{" "}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Study Breaks: </Typography>
            <Typography variant="paragraph">
              Use these techniques during study breaks to refresh your mind,
              re-energize your body, and improve overall productivity.{" "}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">Exam Day Preparation: </Typography>
            <Typography variant="paragraph">
              Practice calming breathing techniques before the exam to reduce
              nervousness, enhance focus, and optimize cognitive performance.{" "}
            </Typography>
          </li>
        </ul>
        <Typography variant="paragraph">
          By incorporating these breathing exercises into your CAT exam
          preparation, you can effectively activate and enhance brain regions
          involved in critical thinking, problem-solving, and information
          processing. Coupled with a structured study plan and healthy lifestyle
          choices, these techniques can contribute to your overall success in
          the exam.
        </Typography>
      </li>
    </ol>
  </section>
);

export const articles = [
  {
    image: "/assets/Picture4.png",
    title: "Optimizing Brain Function for CAT Exam Success",
    description:
      "Discover how understanding the brain regions involved in different CAT exam sections can enhance your preparation strategy. Learn which parts of the brain are engaged during Quantitative Ability, Logical Reasoning, Data Interpretation, and Verbal Ability, and how to optimize your study techniques accordingly.",
    href: "/articles/optimizing-brain-function-for-cat-exam-success",
    slug: "optimizing-brain-function-for-cat-exam-success",
    content: <Article1 />,
  },
  {
    image: "/assets/Picture2.png",
    title: "Yoga Asanas to Enhance Cognitive Abilities for CAT Exam",
    description:
      "Explore specific yoga asanas that can activate and improve the brain regions critical for the CAT exam. From enhancing numerical and spatial reasoning to boosting logical thinking and language comprehension, these yoga poses can aid in optimizing your mental performance.",
    href: "/articles/yoga-asanas-to-enhance-cognitive-abilities-for-cat-exam",
    slug: "yoga-asanas-to-enhance-cognitive-abilities-for-cat-exam",
    content: <Article2 />,
  },
  {
    image: "/assets/Picture1.png",
    title: "Breathing Techniques for Enhanced Focus and Stress Relief",
    description:
      "Learn about effective breathing exercises that can stimulate brain function, reduce stress, and improve concentration for CAT exam preparation. Incorporate these techniques into your study routine and practice them on exam day to achieve optimal mental clarity and focus.",
    href: "/articles/breathing-techniques-for-enhanced-focus-and-stress-relief",
    slug: "breathing-techniques-for-enhanced-focus-and-stress-relief",
    content: <Article3 />,
  },
];

export const testimonials = [
  {
    name: "Rahul Verma",
    role: "B.Com Student",
    src: "/assets/man1.png",
    title: "CAT Prep Success",
    testimonial:
      "This mock test platform has significantly improved my preparation for the CAT exam. The realistic test environment and detailed performance reports have been incredibly helpful.",
  },
  {
    name: "Priya Sharma",
    role: "MBA Aspirant",
    src: "/assets/woman1.png",
    title: "Focused Learning",
    testimonial:
      "The customized test options allowed me to focus on my weak areas and improve steadily. The platform is user-friendly and the adaptive learning feature is fantastic.",
  },
  {
    name: "Anjali Gupta",
    role: "CA Student",
    src: "/assets/woman3.png",
    title: "Confidence Boost",
    testimonial:
      "I appreciate the comprehensive performance analytics and the realistic mock test interface. It truly simulates the actual CAT exam experience, making me feel more confident.",
  },
  {
    name: "Amit Patel",
    role: "BBA Student",
    src: "/assets/man2.png",
    title: "Comprehensive Analysis",
    testimonial:
      "The range of test options, from topic-specific to full-length mock tests, has been a game-changer for my study routine. The detailed reports are particularly useful for tracking my progress.",
  },
  {
    name: "Sneha Iyer",
    role: "Commerce Graduate",
    src: "/assets/woman2.png",
    title: "Efficient Preparation",
    testimonial:
      "The adaptive learning feature is excellent, adjusting the difficulty based on my performance. This platform has made my CAT exam preparation efficient and effective.",
  },
];
