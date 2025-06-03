import {
  Container,
  Text,
  Button,
  Icon,
} from "@/browser/components/shared/no-open-project/styles";
import { DIRECTORY_ERRORS } from "@/extension/config";

export const NoOpenProject = ({
  type,
  message,
  action,
}: {
  type: string;
  message: string;
  action: () => void;
}) => {
  return (
    <Container>
      <Text>{message}</Text>
      {type === DIRECTORY_ERRORS.no_open_project ? (
        <Button onClick={action}>
          <Icon />
          Open Folder
        </Button>
      ) : null}
    </Container>
  );
};
