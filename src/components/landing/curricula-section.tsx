import { useTranslation } from "react-i18next";
import {
  Badge,
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Globe, PieChart, ShieldCheck, Sparkle, Zap } from "lucide-react";

const MotionBox = motion.create(Box);

// `emblem` is intentionally null for now — drop each curriculum's
// emblem/flag image in and replace the dashed-circle placeholder inside
// <CurriculumCard /> with an <Image src={curriculum.emblem} />.
import nationalImage from "@/assets/national.png";
import americanImage from "@/assets/american.png";
import igImage from "@/assets/ig.png";
import ibImage from "@/assets/ib.png";

const CURRICULA = [
  {
    key: "egyptian",
    color: "success",
    nativeName: "المنهج المصري",
    emblem: nationalImage,
  },
  {
    key: "american",
    color: "info",
    nativeName: "المنهج الأمريكي",
    emblem: americanImage,
  },
  {
    key: "british",
    color: "primary",
    nativeName: "المنهج البريطاني",
    emblem: igImage,
  },
  {
    key: "ib",
    color: "warning",
    nativeName: "دبلومة البكالوريا الدولية",
    emblem: ibImage,
  },
] as const;

const STRIP_FEATURES = [
  { key: "aligned", icon: Globe },
  { key: "personalized", icon: PieChart },
  { key: "updated", icon: ShieldCheck },
  { key: "seamless", icon: Zap },
] as const;

type Curriculum = (typeof CURRICULA)[number];

function CurriculumCard({ curriculum }: { curriculum: Curriculum }) {
  const { t } = useTranslation();

  return (
    <Stack
      bg={`${curriculum.color}.subtle`}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="divider"
      p="6"
      gap="4"
      align="start"
      h="full"
    >
      <Badge
        colorPalette={curriculum.color}
        variant="surface"
        borderRadius="full"
        px="2.5"
        py="1"
        alignSelf="flex-end"
        display="flex"
        alignItems="center"
        gap="1"
      >
        <Icon as={Sparkle} boxSize="2.5" aria-hidden="true" />
        {t(`curricula.${curriculum.key}Badge`)}
      </Badge>

      <Flex gap="4" align="center">
        {/* Emblem placeholder — swap for the real curriculum image */}
        <Flex
          boxSize="20"
          flexShrink="0"
          align="center"
          justify="center"
          borderRadius="full"
          bg="surface"
          // borderColor={`${curriculum.color}.muted`}
          boxShadow="elevation1"
        >
          {/* <Icon
            as={ImageIcon}
            boxSize="6"
            color={`${curriculum.color}.solid`}
            opacity="0.5"
            aria-hidden="true"
          /> */}
          <Image
            borderRadius="full"
            boxSize="20"
            borderColor={`${curriculum.color}.muted`}
            src={curriculum.emblem}
          />
        </Flex>

        <Stack gap="0.5">
          <Text as="h3" fontWeight="bold" color="fg" textStyle="bodyLg">
            {t(`curricula.${curriculum.key}Title`)}
          </Text>
          <Text
            fontWeight="medium"
            color={`${curriculum.color}.fg`}
            textStyle="body"
            dir="rtl"
          >
            {curriculum.nativeName}
          </Text>
        </Stack>
      </Flex>

      <Stack gap="1">
        <Text fontWeight="bold" color="fg" textStyle="body">
          {t(`curricula.${curriculum.key}Grades`)}
        </Text>
        <Text textStyle="caption" color="fg.muted">
          {t(`curricula.${curriculum.key}Desc`)}
        </Text>
      </Stack>
    </Stack>
  );
}

// Curricula — "All Major Curriculums. One Smart Platform." Four tinted cards
// (one per supported curriculum) plus a supporting feature strip underneath.
export function CurriculaSection() {
  const { t } = useTranslation();

  return (
    <Box id="curricula" as="section" bg="page" pt={{ base: "16", lg: "24" }}>
      <Stack
        maxW="7xl"
        mx="auto"
        gap={{ base: "10", lg: "12" }}
        px={{ base: "4", md: "6", lg: "8" }}
      >
        <Stack gap="4" align="start" textAlign="start">
          <Text
            as="h2"
            textStyle="h1"
            fontWeight="extrabold"
            color="fg"
            lineHeight="1.2"
          >
            {t("curricula.heading1")}
            <br />
            {t("curricula.heading2Before")}{" "}
            <Text
              as="span"
              color="primary.solid"
              textDecoration="underline"
              textDecorationThickness="4px"
              textUnderlineOffset="8px"
            >
              {t("curricula.headingHighlight")}
            </Text>{" "}
            {t("curricula.heading2After")}
          </Text>
          <Text textStyle="bodyLg" color="fg.subtle" maxW="xl">
            {t("curricula.subtitle")}
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6">
          {CURRICULA.map((curriculum, index) => (
            <MotionBox
              key={curriculum.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <CurriculumCard curriculum={curriculum} />
            </MotionBox>
          ))}
        </SimpleGrid>
      </Stack>

      {/* Supporting feature strip */}
      <Box
        mt={{ base: "12", lg: "16" }}
        bg="surface"
        borderTopWidth="1px"
        borderColor="divider"
        py={{ base: "10", lg: "12" }}
        px={{ base: "4", md: "6", lg: "8" }}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          gap="8"
          maxW="7xl"
          mx="auto"
        >
          {STRIP_FEATURES.map((feature) => (
            <Flex key={feature.key} gap="4" align="flex-start">
              <Flex
                boxSize="12"
                flexShrink="0"
                align="center"
                justify="center"
                borderRadius="lg"
                bg="primary.solid"
                color="primary.contrast"
              >
                <Icon as={feature.icon} boxSize="6" aria-hidden="true" />
              </Flex>
              <Stack gap="1">
                <Text fontWeight="bold" color="fg" textStyle="body">
                  {t(`curricula.${feature.key}Title`)}
                </Text>
                <Text textStyle="caption" color="fg.muted">
                  {t(`curricula.${feature.key}Desc`)}
                </Text>
              </Stack>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
