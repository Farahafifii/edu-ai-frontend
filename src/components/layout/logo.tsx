import { Flex, Icon, Text } from "@chakra-ui/react"
import { Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

// Primary logo lockup — Design Bible p.2 "Brand Identity": wordmark
// "EduAI" (neutral + primary purple) with a small sparkle accent, and the
// tagline set below in caption/muted text.
export function Logo({ withTagline = true }: { withTagline?: boolean }) {
  const { t } = useTranslation()

  return (
    <Flex asChild direction="column" gap="0.5" _hover={{ textDecoration: "none" }}>
      <a href="#">
        <Flex align="center" gap="0.5" lineHeight="1" textStyle="h4" fontWeight="bold">
          <Text as="span" color="fg">
            Edu
          </Text>
          <Text as="span" color="primary.solid">
            AI
          </Text>
          <Icon as={Sparkles} boxSize="3.5" color="primary.solid" aria-hidden="true" />
        </Flex>
        {withTagline && (
          <Text textStyle="caption" color="fg.muted" display={{ base: "none", sm: "block" }}>
            {t("app.tagline")}
          </Text>
        )}
      </a>
    </Flex>
  )
}
