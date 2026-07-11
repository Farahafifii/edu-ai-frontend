import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Box, Circle, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  MoveDown,
  MoveRight,
  Target,
  TrendingUp,
} from "lucide-react";

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

type Step = (typeof STEPS)[number];

function StepCard({ step }: { step: Step }) {
  const { t } = useTranslation();

  return (
    <Stack
      bg="surface"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="divider"
      boxShadow="elevation2"
      p="6"
      gap="4"
      align="center"
      textAlign="center"
      h="full"
    >
      <Box position="relative">
        <Flex
          boxSize="14"
          align="center"
          justify="center"
          borderRadius="lg"
          bg={`${step.color}.subtle`}
        >
          <Icon
            as={step.icon}
            boxSize="7"
            color={`${step.color}.solid`}
            aria-hidden="true"
          />
        </Flex>
        <Circle
          size="6"
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
      <Text as="h3" textStyle="h4" fontWeight="bold" color="fg">
        {t(step.titleKey)}
      </Text>
      <Text textStyle="caption" color="fg.muted">
        {t(step.descKey)}
      </Text>
    </Stack>
  );
}

// Connector between steps: a horizontal arrow when the cards sit side by
// side, a downward arrow when they stack on smaller screens. MoveRight is a
// physical direction, so it's mirrored under RTL to keep pointing at the
// next step.
function StepArrow() {
  return (
    <Flex align="center" justify="center" flexShrink="0" aria-hidden="true">
      <Icon
        as={MoveRight}
        boxSize="8"
        color="primary.solid"
        display={{ base: "none", lg: "block" }}
        _rtl={{ transform: "scaleX(-1)" }}
      />
      <Icon
        as={MoveDown}
        boxSize="8"
        color="primary.solid"
        display={{ base: "block", lg: "none" }}
      />
    </Flex>
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

// "How It Works" — the learning loop laid out as four columns joined by
// arrows (stacking vertically with downward arrows below `lg`), each card
// fading up in sequence as the section scrolls into view.
export function HowItWorksSection() {
  return (
    <Box
      id="how-it-works"
      as="section"
      bg="linear-gradient(to bottom right, #FBFAFF 0%, #E9E1FF 50%, #D3C4FF 100%)"
      _dark={{
        bg: "linear-gradient(to bottom right, #131024 0%, #1A143A 50%, #251B52 100%)",
      }}
      py={{ base: "16", lg: "24" }}
      px={{ base: "4", md: "6", lg: "8" }}
    >
      <Stack maxW="7xl" mx="auto" gap={{ base: "10", lg: "14" }}>
        <SectionHeading />

        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "center", lg: "stretch" }}
          justify="center"
          gap="4"
        >
          {STEPS.map((step, index) => (
            <Fragment key={step.titleKey}>
              {index > 0 && <StepArrow />}
              <MotionBox
                flex="1"
                w={{ base: "full", lg: "auto" }}
                maxW={{ base: "sm", lg: "none" }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <StepCard step={step} />
              </MotionBox>
            </Fragment>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
}
