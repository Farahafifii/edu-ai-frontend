import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Box, Circle, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BarChart3, BookOpen, Target, TrendingUp } from "lucide-react";

const MotionBox = motion.create(Box);

const STEPS = [
  {
    number: 1,
    titleKey: "howItWorks.step1Title",
    descKey: "howItWorks.step1Desc",
    icon: BookOpen,
    color: "primary",
  },
  {
    number: 2,
    titleKey: "howItWorks.step2Title",
    descKey: "howItWorks.step2Desc",
    icon: Target,
    color: "success",
  },
  {
    number: 3,
    titleKey: "howItWorks.step3Title",
    descKey: "howItWorks.step3Desc",
    icon: BarChart3,
    color: "warning",
  },
  {
    number: 4,
    titleKey: "howItWorks.step4Title",
    descKey: "howItWorks.step4Desc",
    icon: TrendingUp,
    color: "info",
  },
] as const;

// Fraction of each step's scroll segment spent transitioning in/out. Smaller
// values mean the card lingers fully visible longer between crossfades.
const FADE_WINDOW = 0.22;

type Step = (typeof STEPS)[number];

// One full card, shared between the pinned desktop slideshow and the plain
// mobile list.
function StepCard({ step }: { step: Step }) {
  const { t } = useTranslation();

  return (
    <Stack
      bg="surface"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="divider"
      boxShadow="elevation3"
      p={{ base: "8", md: "12" }}
      gap="5"
      align="center"
      textAlign="center"
      maxW="2xl"
      w="full"
      mx="auto"
    >
      <Box position="relative">
        <Flex
          boxSize={{ base: "16", md: "20" }}
          align="center"
          justify="center"
          borderRadius="xl"
          bg={`${step.color}.subtle`}
        >
          <Icon
            as={step.icon}
            boxSize={{ base: "8", md: "10" }}
            color={`${step.color}.solid`}
            aria-hidden="true"
          />
        </Flex>
        <Circle
          size="7"
          position="absolute"
          top="-2"
          insetInlineEnd="-2"
          bg={`${step.color}.solid`}
          color={`${step.color}.contrast`}
          fontWeight="bold"
          textStyle="label"
        >
          {step.number}
        </Circle>
      </Box>
      <Text as="h3" textStyle="h3" fontWeight="bold" color="fg">
        {t(step.titleKey)}
      </Text>
      <Text textStyle="bodyLg" color="fg.muted" maxW="lg">
        {t(step.descKey)}
      </Text>
    </Stack>
  );
}

interface StepSlideProps {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}

// Desktop slide: absolutely positioned over its siblings, faded/slid in only
// during its own slice of the pinned scroll range, so exactly one card is
// visible at a time.
function StepSlide({ step, index, progress }: StepSlideProps) {
  const total = STEPS.length;
  const start = index / total;
  const end = (index + 1) / total;
  const fade = FADE_WINDOW / total;

  // The first card starts visible and the last card stays visible, so their
  // outer fade edges are clamped to the range boundaries.
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const inputs = [
    isFirst ? 0 : start,
    isFirst ? 0.0001 : start + fade,
    isLast ? 0.9999 : end - fade,
    isLast ? 1 : end,
  ];

  const opacity = useTransform(progress, inputs, [0, 1, 1, 0]);
  const y = useTransform(progress, inputs, [70, 0, 0, -70]);
  const scale = useTransform(progress, inputs, [0.94, 1, 1, 0.94]);

  return (
    <MotionBox
      style={{ opacity, y, scale }}
      position="absolute"
      inset="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StepCard step={step} />
    </MotionBox>
  );
}

// Progress dot that lights up while its step is on screen.
function StepDot({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const total = STEPS.length;
  const start = index / total;
  const end = (index + 1) / total;
  const fade = FADE_WINDOW / total;

  const active = useTransform(
    progress,
    [
      Math.max(0, start - fade),
      start + fade,
      end - fade,
      Math.min(1, end + fade),
    ],
    [0, 1, 1, 0],
  );
  const dotOpacity = useTransform(active, [0, 1], [0.35, 1]);
  const dotScale = useTransform(active, [0, 1], [1, 1.4]);

  return (
    <MotionBox
      style={{ opacity: dotOpacity, scale: dotScale }}
      boxSize="2.5"
      borderRadius="full"
      bg="primary.solid"
    />
  );
}

function SectionHeading() {
  const { t } = useTranslation();

  return (
    <Stack gap="4" align="center" textAlign="center">
      <Text
        as="h2"
        textStyle="h1"
        fontWeight="extrabold"
        color="fg"
        lineHeight="1.15"
      >
        {t("howItWorks.heading1")}{" "}
        <Text
          as="span"
          color="primary.solid"
          textDecoration="underline"
          textDecorationThickness="4px"
          textUnderlineOffset="8px"
          fontStyle="italic"
        >
          {t("howItWorks.headingHighlight")}
        </Text>
      </Text>
      <Text textStyle="bodyLg" color="fg.subtle" maxW="xl">
        {t("howItWorks.subtitle")}
      </Text>
    </Stack>
  );
}

// "How It Works" — the learning-loop content as a pinned, one-card-at-a-time
// slideshow: the section pins for four viewport-heights of scroll and each
// scroll segment crossfades the next card in while the previous settles out.
// Below `lg` (where scroll-pinning feels janky) it falls back to a plain
// vertical list with a fade-up reveal per card.
export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <Box
      id="how-it-works"
      as="section"
      bg="linear-gradient(to bottom right, #FBFAFF 0%, #E9E1FF 50%, #D3C4FF 100%)"
    >
      {/* Mobile / tablet: simple list, no pinning */}
      <Box
        display={{ base: "block", lg: "none" }}
        py="16"
        px={{ base: "4", md: "6" }}
      >
        <Stack maxW="3xl" mx="auto" gap="10">
          <SectionHeading />
          <Stack gap="6">
            {STEPS.map((step) => (
              <MotionBox
                key={step.titleKey}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <StepCard step={step} />
              </MotionBox>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* Desktop: pinned stage, one card per viewport-height of scroll */}
      <Box
        ref={containerRef}
        display={{ base: "none", lg: "block" }}
        position="relative"
        h={`${STEPS.length * 100}vh`}
      >
        <Flex
          position="sticky"
          top="0"
          h="100vh"
          direction="column"
          align="center"
          justify="center"
          gap="12"
          px="8"
          overflow="hidden"
        >
          <SectionHeading />
          <Box position="relative" w="full" maxW="2xl" h="21rem">
            {STEPS.map((step, index) => (
              <StepSlide
                key={step.titleKey}
                step={step}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </Box>
          <HStack gap="3">
            {STEPS.map((step, index) => (
              <StepDot
                key={step.titleKey}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
