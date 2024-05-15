import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function MultiSelectAutocomplete({
  names,
  personName,
  setPersonName,
  register,
  selectedUser,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
console.log(names)
  useEffect(() => {
    if (
      selectedUser &&
      selectedUser.assignedUser &&
      Array.isArray(selectedUser.assignedUser)
    ) {
      const preselectedUsers = selectedUser.assignedUser.map((user) => ({
        email: user.email,
        _id: user._id,
       
      }));

      const selected = names.filter((name) =>
        preselectedUsers.some((user) => user._id === name._id)
      );
      setSelectedOptions(selected);
      setPersonName(selected.map((user) => user._id));
    }
  }, [selectedUser, names, setPersonName]);

  const handleChange = (event, value) => {
    setSelectedOptions(value);
    setPersonName(value.map((option) => option._id));
  };

  return (
    <Autocomplete
      multiple
      options={names}
      value={selectedOptions}
      onChange={handleChange}
      getOptionLabel={(option) => option.email || option.name}
      getOptionSelected={(option, value) => option._id === value._id}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Select"
          {...register}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <FormControlLabel
            control={<Checkbox checked={selected} />}
            label={option.email || option.name}
          />
        </li>
      )}
    />
  );
}
