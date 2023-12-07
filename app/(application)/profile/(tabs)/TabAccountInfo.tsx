import { PanelHeader } from "@/components/application/panel/PanelHeader";
import { ProfileTabProps } from "../page";
import { TextInput } from "@/components/application/form/TextInput";
import { useSession } from "next-auth/react";
import { Flex } from "@radix-ui/themes";

export const TabAccountInfo = ({ isActive }: ProfileTabProps) => {
  const session = useSession();

  const user = session.data?.user;

  if (!user) return <></>;

  return (
    <PanelHeader
      isActive={isActive}
      title="Account Information"
      description="Update your account information"
    >
      <form>
        <Flex direction="column" gap="4">
          <TextInput
            label="Your Name"
            defaultValue={user.name as string}
            disabled
          />
          <TextInput
            label="Email Address"
            defaultValue={user.email as string}
            disabled
          />
        </Flex>
      </form>
    </PanelHeader>
  );
};
