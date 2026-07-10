import { useTranslation } from "react-i18next"
import { Box, Flex, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { Brain, ClipboardCheck, ListChecks, Target } from "lucide-react"

const FEATURES = [
  {
    titleKey: "features.aiExplainsTitle",
    descKey: "features.aiExplainsDesc",
    icon: Brain,
    color: "primary",
  },
  {
    titleKey: "features.stepByStepTitle",
    descKey: "features.stepByStepDesc",
    icon: ClipboardCheck,
      color: "success",
  },
  {
    titleKey: "features.smartQuizzesTitle",
    descKey: "features.smartQuizzesDesc",
    icon: ListChecks,
    color: "warning",
  },
  {
    titleKey: "features.personalizedTitle",
    descKey: "features.personalizedDesc",
    icon: Target,
    color: "info",
  },
] as const

// "Why EduAI" feature grid — Phase 1 "Landing Discovery Page" body content
// (CLAUDE.md). Each card's own background carries its accent color (a light
// tint of that feature's colorPalette), rather than sitting on a plain
// white/page-colored card.
export function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <Box id="features" as="section" bg="page" py={{ base: "14", lg: "20" }} px={{ base: "4", md: "6", lg: "8" }}>
      <Stack maxW="7xl" mx="auto" gap={{ base: "10", lg: "12" }}>
        <Stack gap="1" align="center" textAlign="center">
          <Text as="h2" textStyle="h1" fontWeight="extrabold" color="fg" lineHeight="1.15">
            {t("features.heading1")}
          </Text>
          <Text as="span" textStyle="h1" fontWeight="bold" fontStyle="italic" color="primary.solid" lineHeight="1.15">
            {t("features.heading2")}
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6">
          {FEATURES.map((feature) => (
            <Stack
              key={feature.titleKey}
              bg={`${feature.color}.subtle`}
              borderRadius="xl"
              p="6"
              gap="3"
              align="start"
              
            >
              <Flex
                boxSize="12"
                align="center"
                justify="center"
                borderRadius="full"
                bg="#FFFFFF"
                boxShadow="elevation1"
              >
                <Icon as={feature.icon} boxSize="6" color={`${feature.color}.solid`} aria-hidden="true" />
              </Flex>
              <Text fontWeight="bold" color="fg">
                {t(feature.titleKey)}
              </Text>
              <Text textStyle="caption" color="fg.muted">
                {t(feature.descKey)}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  )
}
