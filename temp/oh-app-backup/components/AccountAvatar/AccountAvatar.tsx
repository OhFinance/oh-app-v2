/* import { FC } from "react";
import md5 from "md5";
import Gravatar from "react-gravatar";

export interface AccountAvatarProps {
  account: string;
  size?: number;
}

export const AccountAvatar: FC<AccountAvatarProps> = ({ account, size }) => {
  return (
    <Gravatar
      email={md5(account)}
      size={size || 64}
      style={{ borderRadius: (size || 64) / 2 }}
      default="retro"
      protocol="https://"
    />
  );
};
 */