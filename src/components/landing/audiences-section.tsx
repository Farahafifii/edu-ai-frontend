import { useTranslation } from "react-i18next";
import {
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Check,
  GraduationCap,
  HeartHandshake,
  Presentation,
} from "lucide-react";

const MotionBox = motion.create(Box);

// `screenshot` is intentionally null for now — drop each audience's
// dashboard mockup in and replace the dashed placeholder panel inside
// <AudienceRow /> with an <Image src={audience.screenshot} />.

import studentDashboard from "@/assets/student-dashboard-mockup.png";
import parentDashboards from "@/assets/parent-dashboard-mockup.png";
import teacherDashboard from "@/assets/teacher-dashboard-mockup.png";
const AUDIENCES = [
  {
    key: "students",
    color: "primary",
    icon: GraduationCap,
    screenshot: studentDashboard,
  },
  {
    key: "parents",
    color: "success",
    icon: HeartHandshake,
    screenshot: parentDashboards,
  },
  {
    key: "teachers",
    color: "warning",
    icon: Presentation,
    screenshot: teacherDashboard,
  },
] as const;

type Audience = (typeof AUDIENCES)[number];

function AudienceRow({
  audience,
  reversed,
}: {
  audience: Audience;
  reversed: boolean;
}) {
  const { t } = useTranslation();

  return (
    <MotionBox
      id={audience.key}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Flex
        direction={{ base: "column", lg: reversed ? "row-reverse" : "row" }}
        align="center"
        gap={{ base: "8", lg: "16" }}
      >
        {/* Copy */}
        <Stack flex="1" gap="5" align="start">
          <HStack
            gap="1.5"
            bg={`${audience.color}.subtle`}
            color={`${audience.color}.fg`}
            borderRadius="full"
            px="3"
            py="1.5"
            textStyle="label"
            fontWeight="medium"
          >
            <Icon as={audience.icon} boxSize="3.5" aria-hidden="true" />
            <Text as="span">{t(`audiences.${audience.key}Label`)}</Text>
          </HStack>

          <Text
            as="h3"
            textStyle="h2"
            fontWeight="extrabold"
            color="fg"
            lineHeight="1.2"
          >
            {t(`audiences.${audience.key}Heading`)}
          </Text>

          <Text textStyle="bodyLg" color="fg.muted" maxW="lg">
            {t(`audiences.${audience.key}Subheading`)}
          </Text>

          <Stack gap="3" pt="1">
            {([1, 2, 3] as const).map((n) => (
              <HStack key={n} gap="3" align="flex-start">
                <Circle
                  size="5"
                  bg={`${audience.color}.subtle`}
                  color={`${audience.color}.solid`}
                  flexShrink="0"
                  mt="0.5"
                >
                  <Icon as={Check} boxSize="3" aria-hidden="true" />
                </Circle>
                <Text textStyle="body" color="fg">
                  {t(`audiences.${audience.key}Point${n}`)}
                </Text>
              </HStack>
            ))}
          </Stack>
        </Stack>

        {/* Dashboard screenshot placeholder — swap for the real mockup */}
        <Flex
          flex="1"
          w="full"
          aspectRatio={5 / 3}
          align="center"
          justify="center"
           
          borderColor={`${audience.color}.muted`}
        >
          <Image
            src={audience.screenshot}
            alt={t(`audiences.${audience.key}Label`)}
          />
        </Flex>
      </Flex>
    </MotionBox>
  );
}

// Target audiences — one alternating text/visual row per user type
// (students, parents, teachers), each color-coded and leaving room for a
// dashboard mockup on the visual side.
export function AudiencesSection() {
  const { t } = useTranslation();

  return (
    <Box
      as="section"
      bg="page"
      py={{ base: "16", lg: "24" }}
      px={{ base: "4", md: "6", lg: "8" }}
    >
      <Stack maxW="7xl" mx="auto" gap={{ base: "14", lg: "24" }}>
        <Stack gap="4" align="center" textAlign="center">
          <Text
            as="h2"
            textStyle="h1"
            fontWeight="extrabold"
            color="fg"
            lineHeight="1.15"
          >
            {t("audiences.headingBefore")}{" "}
            <Text
              as="span"
              color="primary.solid"
              textDecoration="underline"
              textDecorationThickness="4px"
              textUnderlineOffset="8px"
            >
              {t("audiences.headingHighlight")}
            </Text>
          </Text>
          <Text textStyle="bodyLg" color="fg.subtle" maxW="xl">
            {t("audiences.subtitle")}
          </Text>
        </Stack>

        {AUDIENCES.map((audience, index) => (
          <AudienceRow
            key={audience.key}
            audience={audience}
            reversed={index % 2 === 1}
          />
        ))}
      </Stack>
    </Box>
  );
}
