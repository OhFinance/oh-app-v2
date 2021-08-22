import { Box, Typography } from "@material-ui/core";
import { FC } from "react";

export interface ViewHeaderProps {
  title: string;
  subtitle?: string;
  paragraph?: string;
}

export const ViewHeader: FC<ViewHeaderProps> = ({
  title,
  subtitle,
  paragraph,
  ...props
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" paragraph>
          {subtitle}
        </Typography>
      )}
      {paragraph && (
        <Typography variant="body2" paragraph>
          {paragraph}
        </Typography>
      )}
    </Box>
  );
};
