import { InputAdornment, TextField } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useMobile } from "@ohfinance/oh-ui";

export const EarnSearchBar = () => {
  const mobile = useMobile();

  return (
    <TextField
      fullWidth={mobile}
      variant="outlined"
      size="small"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
