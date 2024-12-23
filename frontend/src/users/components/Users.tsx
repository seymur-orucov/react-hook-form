import { useEffect } from "react";
import {
  Form,
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {MultiSelect} from "@/components/ui/customSelect.tsx";

// import {
//   Button,
//   Container,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   ListSubheader,
//   Stack,
//   Typography,
// } from "@mui/material";

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
import { CustomFormField } from "@/components/ui/customFormField.tsx";

export function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const form = useFormContext<Schema>();

  // const {
  //   register,
  //   formState: { errors },
  //   watch,
  //   control,
  //   unregister,
  //   reset,
  //   setValue,
  //   handleSubmit,
  // } = useFormContext<Schema>();

  const id = useWatch({ control: form.control, name: "id" });
  const variant = useWatch({ control: form.control, name: "variant" });

  const userQuery = useUser(id);

  useEffect(() => {
    const sub = form.watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [form.watch]);

  const isTeacher = useWatch({ control: form.control, name: "isTeacher" });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "students",
  });

  const handleUserClick = (id: string) => {
    form.setValue("id", id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      form.unregister("students");
    }
  }, [isTeacher, replace, form.unregister]);

  useEffect(() => {
    if (userQuery.data) {
      form.reset(userQuery.data);
    }
  }, [form.reset, userQuery.data]);

  const handleReset = () => {
    form.reset(defaultValues);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2">
        <div>
          <h1>Users</h1>
          <ul>
            {usersQuery.data?.map((user) => (
              <li key={user.id}>
                <Button
                  variant="link"
                  onClick={() => handleUserClick(user.id)}
                  type="button"
                >
                  {user.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>User</h2>
          <CustomFormField<Schema> name="name" label="Name" />
          <CustomFormField<Schema> name="email" label="Email" />
          <MultiSelect options={statesQuery.data} onChange={(item) => console.log(item)} />
        </div>
      </form>
    </Form>
    // <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
    //   <Stack sx={{ flexDirection: "row", gap: 2 }}>
    //     <List subheader={<ListSubheader>Users</ListSubheader>}>
    //       {usersQuery.data?.map((user) => (
    //         <ListItem disablePadding key={user.id}>
    //           <ListItemButton
    //             onClick={() => handleUserClick(user.id)}
    //             selected={id === user.id}
    //           >
    //             <ListItemText primary={user.label} />
    //           </ListItemButton>
    //         </ListItem>
    //       ))}
    //     </List>

    //     <Stack>
    //       <Stack sx={{ gap: 2 }}>
    //         <CustomTextField<Schema> name="name" label="Name" />
    //         <CustomTextField<Schema> name="email" label="Email" />
    //         <CustomAutocomplete<Schema>
    //           name="states"
    //           label="States"
    //           options={statesQuery.data}
    //         />
    //         <CustomToggleButtonGroup<Schema>
    //           name="languagesSpoken"
    //           options={languagesQuery.data}
    //         />
    //         <CustomRadioGroup<Schema>
    //           name="gender"
    //           options={gendersQuery.data}
    //           label="Gender"
    //         />
    //         <CustomCheckbox<Schema>
    //           name="skills"
    //           options={skillsQuery.data}
    //           label="Skills"
    //         />
    //         <CustomDateTimePicker<Schema>
    //           name="registrationDateAndTime"
    //           label="Registration Date & Time"
    //         />
    //         <Typography>Former Employment Period:</Typography>
    //         <CustomDateRangePicker<Schema> name="formerEmploymentPeriod" />
    //         <CustomSlider<Schema> name="salaryRange" label="Salary Range" />
    //         <CustomSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

    //         {isTeacher && (
    //           <Button onClick={() => append({ name: "" })} type="button">
    //             Add new student
    //           </Button>
    //         )}

    //         {fields.map((field, index) => (
    //           <Fragment key={field.id}>
    //             <CustomTextField name={`students.${index}.name`} label="Name" />
    //             <Button
    //               type="button"
    //               color="error"
    //               onClick={() => remove(index)}
    //             >
    //               Remove
    //             </Button>
    //           </Fragment>
    //         ))}
    //       </Stack>

    //       <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
    //         <Button variant="default" type="submit">
    //           {variant === "create" ? "New user" : "Edit user"}
    //         </Button>
    //         <Button variant="secondary" onClick={handleReset}>
    //           Reset
    //         </Button>
    //       </Stack>
    //     </Stack>
    //   </Stack>
    // </Container>
  );
}
