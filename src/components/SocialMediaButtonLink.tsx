import { FontAwesome } from "@expo/vector-icons";
import { Linking, TouchableOpacity } from "react-native";


export type SocialMedia = {
    name: "github" | "linkedin" | "twitter";
    link: string
}

type SocialMediaButtonLinkProps = {
    socialMedia: SocialMedia
}


export function SocialMediaButtonLink({ socialMedia } : SocialMediaButtonLinkProps) {
    async function handleLink(link: string) {
        await Linking.openURL(link);
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleLink(socialMedia.link)}>
          <FontAwesome name={socialMedia.name} color="#FFFFFF" size={30}/>
        </TouchableOpacity>
    );
}