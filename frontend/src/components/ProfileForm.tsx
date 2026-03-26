import axios from "axios";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { useProfiling } from "../hooks/useProfiling";
import { Profile } from "../pages/profiling/Profiling";
import getEmptyProfileFormValues, { ProfileFormValues } from "../utils/profile";
import { FormMessageProps } from "../utils/types";

type ProfileProps = {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
  profileDetails?: Profile;
};

const ProfileForm: React.FC<ProfileProps> = ({
  isEditing,
  setMessage,
  profileDetails,
}) => {
  const [values, setValues] = useState<ProfileFormValues>({
    firstName: profileDetails?.firstName ?? "",
    middleName: profileDetails?.middleName ?? "",
    lastName: profileDetails?.lastName ?? "",
    suffix: profileDetails?.suffix ?? "",
    dateOfBirth: profileDetails?.dateOfBirth ?? "",
    age: profileDetails?.age ?? "",
    gender: profileDetails?.gender ?? "",
    maritalStatus: profileDetails?.maritalStatus ?? "",
    address: profileDetails?.address ?? "",
    mobileNumber: profileDetails?.mobileNumber ?? "",
    emailAddress: profileDetails?.emailAddress ?? "",
    educationalBackground: profileDetails?.educationalBackground ?? "",
    occupation: profileDetails?.occupation ?? "",
  });
  const [errors, setErrors] = useState<ProfileFormValues>(
    getEmptyProfileFormValues(),
  );
  const [formMessage, setFormMessage] = useState<FormMessageProps | null>(null);
  const { username } = useAuth();
  const { isMobileNumberValid, isEmailValid, isAgeValid } = useAppUtility();
  const navigate = useNavigate();
  const { stopEditing } = useProfiling();

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    let formattedValue = value;

    if (name === "emailAddress") {
      formattedValue = value.toLowerCase();
    } else if (name === "mobileNumber" || name === "age") {
      formattedValue = value.replace(/\D/g, "");
    } else {
      formattedValue = value.toUpperCase();
    }

    setValues((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "emailAddress") {
      setErrors((prev) => ({
        ...prev,
        emailAddress: "",
      }));
    }

    if (name === "mobileNumber") {
      setErrors((prev) => ({
        ...prev,
        mobileNumber: "",
      }));
    }

    if (formMessage) setFormMessage(null);
  };

  const handleOnClose = (): void => {
    if (isEditing) {
      stopEditing();
    }
    navigate(-1);
  };

  const handleOnSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ): Promise<void> => {
    event.preventDefault();
    const submitter = event.nativeEvent.submitter;
    const id =
      submitter instanceof HTMLInputElement ? submitter.value : undefined;
    const sanitize = (value: string): string => (value ?? "").trim();
    const payload = {
      ...values,
      firstName: sanitize(values.firstName),
      middleName: sanitize(values.middleName),
      lastName: sanitize(values.lastName),
      address: sanitize(values.address),
      mobileNumber: sanitize(values.mobileNumber),
      emailAddress: sanitize(values.emailAddress),
      ...(isEditing ? { updatedBy: username } : { createdBy: username }),
    };
    if (validation() && !isEditing) {
      try {
        const response = await post("/profiles", payload);
        if (response.status === 201) {
          /*
          This async operation is a temporary fix for triggering data syncronization. Backend orchestration: Trigger RabbitMQ publish inside the service layer where the data change actually happens.
          */
          await get("/rabbitmq/profiles/send");
          if (id === "Save & Add New") {
            setFormMessage({
              isError: false,
              message: "Profile successfully saved.",
            });
          } else {
            setMessage("Profile successfully saved.");
            navigate("/profiling", { replace: true });
          }
          setValues(getEmptyProfileFormValues());
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          setFormMessage({
            isError: true,
            message: error.response?.data?.message + ".",
          });
        } else {
          setFormMessage({
            isError: true,
            message:
              "Oops, something went wrong. Please contact your system administrator.",
          });
        }
        setValues(getEmptyProfileFormValues());
        console.error("Error submitting profile data: ", error);
      }
    } else if (isEditing && profileDetails !== null) {
      try {
        const response = await put("profiles/" + profileDetails?.id, payload);
        if (response.status === 200) {
          /*
          This async operation is a temporary fix for triggering data syncronization. Backend orchestration: Trigger RabbitMQ publish inside the service layer where the data change actually happens.
          */
          await get("/rabbitmq/profiles/send");
          setMessage("Changes successfully applied.");
          navigate("/profiling", { replace: true });
        }
        setValues(getEmptyProfileFormValues());
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          setFormMessage({
            isError: true,
            message: error.response?.data?.message + ".",
          });
        } else {
          setFormMessage({
            isError: true,
            message:
              "Oops, something went wrong. Please contact your system administrator.",
          });
        }
        setValues(getEmptyProfileFormValues());
        console.error("Error submitting profile data: ", error);
      }
    }
    // } else if (validation() && isEditing && profileDetails !== null) {
    //   try {
    //     const { lastName, firstName, middleName } = values;
    //     const response = await put("/profiles/" + profileDetails.id, {
    //       ...values,
    //       lastName: lastName.trim(),
    //       firstName: firstName.trim(),
    //       middleName: middleName.trim(),
    //       updatedBy: username,
    //     });
    //     if (response.status === 200) {
    //       await get("/rabbitmq/profiles/send");
    //       setSuccessMessage("Profile updated successfully.");
    //       resetState("profiling");
    //       resetSearchState();
    //       resetPageNumber();
    //       fetchAllProfiles();
    //     }
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       setValues(getEmptyProfileFormValues());
    //       setGlobalError(
    //         "Oops, something went wrong. Please contact your system administrator.",
    //       );
    //     }
    //     console.error("Error submitting profile data: ", error);
    //   }
    // }
  };

  const validation = (): boolean => {
    let isValid = true;
    const newErrors: ProfileFormValues = { ...getEmptyProfileFormValues() };

    if (!values.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!values.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!values.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
      isValid = false;
    }

    if (!values.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!values.maritalStatus) {
      newErrors.maritalStatus = "Civil status is required.";
      isValid = false;
    }

    if (!values.address) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!values.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
      isValid = false;
    }

    if (values.mobileNumber && !isMobileNumberValid(values.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format";
      isValid = false;
    }

    if (values.emailAddress && !isEmailValid(values.emailAddress)) {
      newErrors.emailAddress = "Invalid email address format";
      isValid = false;
    }

    if (values.age && !isAgeValid(values.age)) {
      newErrors.age = "Invalid age format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {formMessage && (
        <div
          role="alert"
          className={`alert ${!formMessage.isError ? "alert-success" : "alert-error"} rounded-none flex justify-between`}
        >
          <div className="flex items-center gap-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{formMessage.message}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={() => setFormMessage(null)}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      )}
      <form className="p-4 w-full max-w-screen-md" onSubmit={handleOnSubmit}>
        <h2 className="text-2xl">Personal Information</h2>
        <div className="flex justify-start flex-wrap gap-x-8 mb-3">
          <label className="form-control w-1/4 flex-none">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={
                errors.firstName
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.firstName}
              onChange={handleOnChange}
            />
            {errors.firstName && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.firstName}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-1/4 flex-none">
            <div className="label">
              <span className="label-text">Middle Name</span>
            </div>
            <input
              id="middleName"
              name="middleName"
              type="text"
              className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              value={values.middleName}
              onChange={handleOnChange}
            />
          </label>
          <label className="form-control w-1/4 flex-none">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={
                errors.lastName
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.lastName}
              onChange={handleOnChange}
              autoFocus
            />
            {errors.lastName && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.lastName}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-16 flex-none">
            <div className="label">
              <span className="label-text">Suffix</span>
            </div>
            <select
              id="suffix"
              name="suffix"
              className="input input-sm input-bordered rounded-none w-full px-3"
              value={values.suffix}
              onChange={handleOnChange}
            >
              <option value="">Select suffix</option>
              <option value="JR.">JR.</option>
              <option value="SR.">SR.</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
            </select>
          </label>
          <label className="form-control w-1/4 flex-none">
            <div className="label">
              <span className="label-text">Date of Birth</span>
            </div>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              className={
                errors.dateOfBirth
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.dateOfBirth}
              onChange={handleOnChange}
            />
            {errors.dateOfBirth && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.dateOfBirth}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-12 flex-none">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              id="age"
              name="age"
              type="text"
              className={
                errors.age
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.age ?? undefined}
              onChange={handleOnChange}
            />
            {errors.age && (
              <div className="label">
                <span className="label-text-alt text-error">{errors.age}</span>
              </div>
            )}
          </label>
          <label className="form-control w-1/4">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              id="gender"
              name="gender"
              className={
                errors.gender
                  ? "input input-sm input-bordered input-error rounded-none w-full px-3"
                  : "input input-sm input-bordered rounded-none w-full px-3"
              }
              value={values.gender}
              onChange={handleOnChange}
            >
              <option value="">Select gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="NON-BINARY">NON-BINARY</option>
              <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
            </select>
            {errors.gender && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.gender}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-1/4 flex-none">
            <div className="label">
              <span className="label-text">Civil Status</span>
            </div>
            <select
              id="maritalStatus"
              name="maritalStatus"
              className={
                errors.maritalStatus
                  ? "input input-sm input-bordered input-error rounded-none w-full px-3"
                  : "input input-sm input-bordered rounded-none w-full px-3"
              }
              value={values.maritalStatus}
              onChange={handleOnChange}
            >
              <option value="">Select civil status</option>
              <option value="SINGLE">SINGLE</option>
              <option value="MARRIED">MARRIED</option>
              <option value="DIVORCED">DIVORCED</option>
              <option value="WIDOWED">WIDOWED</option>
              <option value="SEPARATED">SEPARATED</option>
              <option value="DOMESTIC PARTNERSHIP">DOMESTIC PARTNERSHIP</option>
            </select>
            {errors.maritalStatus && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.maritalStatus}
                </span>
              </div>
            )}
          </label>
        </div>
        <h2 className="text-2xl">Contact Information</h2>
        <div className="flex justify-start flex-wrap gap-x-8 mb-3">
          <label className="form-control w-1/2 flex-none">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <textarea
              id="address"
              name="address"
              rows={1}
              className={
                errors.address
                  ? "textarea textarea-sm textarea-bordered textarea-error rounded-none w-full py-1.5 px-3"
                  : "textarea textarea-sm textarea-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.address}
              onChange={handleOnChange}
            ></textarea>
            {errors.address && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.address}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-2/5 flex-none">
            <div className="label">
              <span className="label-text">Mobile Number</span>
              <span className="label-text-alt text-gray-600">
                (e.g. 09123456789)
              </span>
            </div>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="text"
              className={
                errors.mobileNumber
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.mobileNumber}
              onChange={handleOnChange}
            />
            {errors.mobileNumber && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.mobileNumber}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-2/5 flex-none">
            <div className="label">
              <span className="label-text">Email Address</span>
            </div>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              className={
                errors.emailAddress
                  ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              }
              value={values.emailAddress}
              onChange={handleOnChange}
            />
            {errors.emailAddress && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.emailAddress}
                </span>
              </div>
            )}
          </label>
        </div>
        <h2 className="text-2xl">Background Information</h2>
        <div className="flex justify-start gap-x-8">
          <label className="form-control w-1/2 flex-1">
            <div className="label">
              <span className="label-text">Occupation (Optional)</span>
            </div>
            <input
              id="occupation"
              name="occupation"
              type="text"
              className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
              value={values.occupation}
              onChange={handleOnChange}
            />
          </label>
          <label className="form-control w-1/2 flex-1">
            <div className="label">
              <span className="label-text">
                Educational Attainment (Optional)
              </span>
            </div>
            <select
              id="educationalBackground"
              name="educationalBackground"
              className="input input-sm input-bordered rounded-none w-full px-3"
              value={values.educationalBackground}
              onChange={handleOnChange}
            >
              <option value="">Select educational attainment</option>
              <option value="NO FORMAL EDUCATION">NO FORMAL EDUCATION</option>
              <option value="SOME ELEMENTARY">SOME ELEMENTARY SCHOOL</option>
              <option value="ELEMENTARY GRADUATE">ELEMENTARY GRADUATE</option>
              <option value="SOME JUNIOR HIGH SCHOOL">
                SOME JUNIOR HIGH SCHOOL
              </option>
              <option value="JUNIOR HIGH SCHOOL GRADUATE">
                JUNIOR HIGH SCHOOL GRADUATE
              </option>
              <option value="SOME SENIOR HIGH SCHOOL">
                SOME SENIOR HIGH SCHOOL
              </option>
              <option value="SENIOR HIGH SCHOOL GRADUATE">
                SENIOR HIGH SCHOOL GRADUATE
              </option>
              <option value="SOME COLLEGE">SOME COLLEGE</option>
              <option value="COLLEGE GRADUATE">COLLEGE GRADUATE</option>
              <option value="POSTGRADUATE STUDIES">POSTGRADUATE STUDIES</option>
            </select>
          </label>
        </div>
        <div className="flex flex-row-reverse gap-x-1.5 py-1.5">
          {!profileDetails && (
            <input
              data-id="new"
              type="submit"
              className="btn btn-sm btn-primary rounded-none"
              value="Save & Add New"
            />
          )}
          <input
            data-id="add"
            type="submit"
            className="btn btn-sm btn-outline rounded-none"
            value="Save & Close"
          />
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={handleOnClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
