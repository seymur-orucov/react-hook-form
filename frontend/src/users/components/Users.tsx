import { Fragment, useEffect } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";

import { defaultValues, Schema } from "../types/schema.ts";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries.ts";

import { CustomAutocomplete } from "../../components/CustomAutocomplete.tsx";
import { CustomToggleButtonGroup } from "../../components/CustomToggleButtonGroup.tsx";
import { CustomRadioGroup } from "../../components/CustomRadioGroup.tsx";
import { CustomCheckbox } from "../../components/CustomCheckbox.tsx";
import { CustomDateTimePicker } from "../../components/CustomDateTimePicker.tsx";
import { CustomDateRangePicker } from "../../components/CustomDateRangePicker.tsx";
import { CustomSlider } from "../../components/CustomSlider.tsx";
import { CustomSwitch } from "../../components/CustomSwitch.tsx";
import { CustomTextField } from "../../components/CustomTextField.tsx";
import { useCreateUser, useEditUser } from "../services/mutations.ts";

export function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const {
    register,
    formState: { errors },
    watch,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
  } = useFormContext<Schema>();

  const id = useWatch({ control: control, name: "id" });
  const variant = useWatch({ control: control, name: "variant" });

  const userQuery = useUser(id);

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  const isTeacher = useWatch({ control: control, name: "isTeacher" });

  const { fields, append, remove, replace } = useFieldArray({
    control: control,
    name: "students",
  });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack>
          <Stack sx={{ gap: 2 }}>
            <CustomTextField<Schema> name="name" label="Name" />
            <CustomTextField<Schema> name="email" label="Email" />
            <CustomAutocomplete<Schema>
              name="states"
              label="States"
              options={statesQuery.data}
            />
            <CustomToggleButtonGroup<Schema>
              name="languagesSpoken"
              options={languagesQuery.data}
            />
            <CustomRadioGroup<Schema>
              name="gender"
              options={gendersQuery.data}
              label="Gender"
            />
            <CustomCheckbox<Schema>
              name="skills"
              options={skillsQuery.data}
              label="Skills"
            />
            <CustomDateTimePicker<Schema>
              name="registrationDateAndTime"
              label="Registration Date & Time"
            />
            <Typography>Former Employment Period:</Typography>
            <CustomDateRangePicker<Schema> name="formerEmploymentPeriod" />
            <CustomSlider<Schema> name="salaryRange" label="Salary Range" />
            <CustomSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

            {isTeacher && (
              <Button onClick={() => append({ name: "" })} type="button">
                Add new student
              </Button>
            )}

            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <CustomTextField name={`students.${index}.name`} label="Name" />
                <Button
                  type="button"
                  color="error"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Fragment>
            ))}
          </Stack>

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" type="submit">
              {variant === "create" ? "New user" : "Edit user"}
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
