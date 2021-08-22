import { FC } from "react";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";

export interface EarnCompositionGroupProps {
  composition: string[];
}

export const EarnCompositionGroup: FC<EarnCompositionGroupProps> = ({
  composition,
}) => {
  return (
    <AvatarGroup max={5}>
      {composition.map((protocol: string, i: number) => (
        <Avatar key={i} src={protocol} />
      ))}
    </AvatarGroup>
  );
};
