import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { ProfileType, Record } from "../pages/HealthRecord";
import { Profile } from "../pages/Profiling";
import getEmptyProfileFormValues, { ProfileFormValues } from "../utils/profile";

type HealthRecordProps = {
  setCurrentHealthRecordView: (view: string) => void;
  setSuccessMessage: (message: string) => void;
  fetchAllRecords: () => Promise<void>;
  recordDetails: Record | null;
  profileDetails: Profile | null;
  profileTypes: ProfileType[];
  isEditing: boolean;
  isNotEditingRecord: () => void;
};

interface Department {
  id: number;
  name: string;
  services: string[];
}

interface HealthRecordFormValues {
  profileType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  department: string;
  height: string;
  weight: string;
  bloodPressure: string;
}

const HealthRecordForm: React.FC<HealthRecordProps> = ({
  setCurrentHealthRecordView,
  setSuccessMessage,
  fetchAllRecords,
  recordDetails,
  profileDetails,
  profileTypes,
  isEditing,
  isNotEditingRecord,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formValues, setFormValues] = useState<HealthRecordFormValues>({
    profileType: recordDetails?.profileType || "",
    firstName: profileDetails?.firstName || "",
    middleName: profileDetails?.middleName || "",
    lastName: profileDetails?.lastName || "",
    suffix: profileDetails?.suffix || "",
    department: recordDetails?.department || "",
    height: recordDetails?.height || "",
    weight: recordDetails?.weight || "",
    bloodPressure: recordDetails?.bloodPressure || "",
  });
  const [profileFormValues, setProfileFormValues] = useState<ProfileFormValues>(
    {
      firstName: profileDetails?.firstName || "",
      middleName: profileDetails?.middleName || "",
      lastName: profileDetails?.lastName || "",
      suffix: profileDetails?.suffix || "",
      dateOfBirth: profileDetails?.dateOfBirth || "",
      gender: profileDetails?.gender || "",
      maritalStatus: profileDetails?.maritalStatus || "",
      address: profileDetails?.address || "",
      mobileNumber: profileDetails?.mobileNumber || "",
      occupation: profileDetails?.occupation || "",
      educationalBackground: profileDetails?.educationalBackground || "",
      householdSize: profileDetails?.householdSize || null,
      incomeBracket: profileDetails?.incomeBracket || "",
    }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMobileNumberValid } = useAppUtility();
  const [profileFormErrors, setProfileFormErrors] = useState<ProfileFormValues>(
    getEmptyProfileFormValues()
  );
  const [recordFormErrors, setRecordFormErrors] =
    useState<HealthRecordFormValues>({
      profileType: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      department: "",
      height: "",
      weight: "",
      bloodPressure: "",
    });
  const { username } = useAuth();
  const [globalError, setGlobalError] = useState<string>("");

  useEffect(() => {
    const fetchAllDepartments = async () => {
      setIsLoading(true);
      try {
        const response = await get("/departments");
        setDepartments(response.data as Department[]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllDepartments();
  }, []);

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    const formPrefix = "form_";
    const profilePrefix = "profile_";

    if (name.startsWith(formPrefix)) {
      if (name.slice(formPrefix.length) === "height") {
        if (/^\d{0,3}$/.test(value)) {
          setFormValues({
            ...formValues,
            [name.slice(formPrefix.length)]: value,
          });
          setRecordFormErrors({
            ...recordFormErrors,
            [name.slice(formPrefix.length)]: "",
          });
        }
      } else if (name.slice(formPrefix.length) === "weight") {
        if (/^\d{0,3}$/.test(value)) {
          setFormValues({
            ...formValues,
            [name.slice(formPrefix.length)]: value,
          });
          setRecordFormErrors({
            ...recordFormErrors,
            [name.slice(formPrefix.length)]: "",
          });
        }
      } else if (name.slice(formPrefix.length) === "bloodPressure") {
        if (/^\d{0,3}(\/\d{0,3})?$/.test(value)) {
          setFormValues({
            ...formValues,
            [name.slice(formPrefix.length)]: value,
          });
          setRecordFormErrors({
            ...recordFormErrors,
            [name.slice(formPrefix.length)]: "",
          });
        }
      } else {
        setFormValues({
          ...formValues,
          [name.slice(formPrefix.length)]: value,
        });
        setRecordFormErrors({
          ...recordFormErrors,
          [name.slice(formPrefix.length)]: "",
        });
      }
    } else if (name.startsWith(profilePrefix)) {
      if (name.slice(profilePrefix.length) === "mobileNumber") {
        const mobileNumberPattern = /^(|[0-9]\d{0,10})$/;
        if (mobileNumberPattern.test(value)) {
          setProfileFormValues({
            ...profileFormValues,
            [name.slice(profilePrefix.length)]: value,
          });
          setProfileFormErrors({
            ...profileFormErrors,
            [name.slice(profilePrefix.length)]: "",
          });
        }
      } else {
        setProfileFormValues({
          ...profileFormValues,
          [name.slice(profilePrefix.length)]: value.toUpperCase(),
        });
        setProfileFormErrors({
          ...profileFormErrors,
          [name.slice(profilePrefix.length)]: "",
        });
      }
    }
  };

  const handleGoBackClick = () => {
    setCurrentHealthRecordView("EHRs");
    isNotEditingRecord();
  };

  const isHeightValid = (value: string): boolean => {
    let isValid = false;
    const regex = /^\d{2,3}$/;
    if (regex.test(value)) {
      isValid = true;
    }
    return isValid;
  };

  const isWeightValid = (value: string): boolean => {
    let isValid = false;
    const regex = /^\d{2,3}$/;
    if (regex.test(value)) {
      isValid = true;
    }
    return isValid;
  };

  const isBloodPressureValid = (value: string): boolean => {
    let isValid = false;
    const regex = /^\d{3}\/\d{2,3}$/;
    if (value === "") {
      isValid = true;
    }
    if (regex.test(value)) {
      isValid = true;
    }
    return isValid;
  };

  const resetRecordAndProfileFormValues = (): void => {
    setFormValues({
      profileType: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      department: "",
      height: "",
      weight: "",
      bloodPressure: "",
    });
    setProfileFormValues(getEmptyProfileFormValues());
  };

  const handleOnSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (validation() && !isEditing) {
      if (formValues.profileType === "OLD") {
        const { lastName, firstName, middleName, suffix } = profileFormValues;
        const pathSegments = [
          lastName.trim(),
          firstName.trim(),
          middleName.trim(),
          suffix,
        ].filter(Boolean);
        const url = `/profiles/${pathSegments.join("/")}`;
        try {
          const response = await get(url);
          if (response.status === 200) {
            const { id } = response.data as Profile;
            const profileResponse = await put("/profiles/" + id, {
              ...profileFormValues,
              updatedBy: username,
            });
            if (profileResponse.status === 200) {
              const recordResponse = await post("/records", {
                ...formValues,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                suffix: suffix,
                createdBy: username,
              });
              if (recordResponse.status === 201) {
                setSuccessMessage("Record created successfully.");
                resetRecordAndProfileFormValues();
                fetchAllRecords();
                setCurrentHealthRecordView("EHRs");
              }
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setGlobalError(
              "Duplicate profiles found in the database. Please try again."
            );
            resetRecordAndProfileFormValues();
          }
          console.error("Error submitting data: ", error);
        }
      } else if (formValues.profileType === "NEW") {
        try {
          const profileResponse = await post("/profiles", {
            ...profileFormValues,
            createdBy: username,
          });
          if (profileResponse.status === 201) {
            const recordResponse = await post("/records", {
              ...formValues,
              firstName: profileFormValues.firstName,
              middleName: profileFormValues.middleName,
              lastName: profileFormValues.lastName,
              suffix: profileFormValues.suffix,
              createdBy: username,
            });
            if (recordResponse.status === 201) {
              setSuccessMessage("Record created successfully.");
              resetRecordAndProfileFormValues();
              fetchAllRecords();
              setCurrentHealthRecordView("EHRs");
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setGlobalError(
              "Oops, something went wrong. Please contact your system administrator."
            );
            resetRecordAndProfileFormValues();
          }
          console.error("Error submitting data: ", error);
        }
      }
    } else if (
      validation() &&
      isEditing &&
      recordDetails !== null &&
      profileDetails !== null
    ) {
      const { lastName, firstName, middleName, suffix } = profileFormValues;
      const pathSegments = [lastName, firstName, middleName, suffix].filter(
        Boolean
      );
      const url = `/profiles/${pathSegments.join("/")}`;
      try {
        const response = await get(url);
        if (response.status === 200) {
          const { id } = response.data as Profile;
          const profileResponse = await put("/profiles/" + id, {
            ...profileFormValues,
            updatedBy: username,
          });
          if (profileResponse.status === 200) {
            const recordResponse = await put("/records/" + recordDetails.id, {
              ...formValues,
              firstName: profileFormValues.firstName,
              middleName: profileFormValues.middleName,
              lastName: profileFormValues.lastName,
              suffix: profileFormValues.suffix,
              updatedBy: username,
            });
            if (recordResponse.status === 200) {
              setSuccessMessage("Record updated successfully.");
              isNotEditingRecord();
              resetRecordAndProfileFormValues();
              fetchAllRecords();
              setCurrentHealthRecordView("EHRs");
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validation = (): boolean => {
    let isValid = true;
    const newProfileFormErrors: ProfileFormValues = getEmptyProfileFormValues();
    const newRecordFormErrors: HealthRecordFormValues = {
      profileType: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      department: "",
      height: "",
      weight: "",
      bloodPressure: "",
    };

    if (!profileFormValues.firstName) {
      newProfileFormErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!profileFormValues.lastName) {
      newProfileFormErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!profileFormValues.dateOfBirth) {
      newProfileFormErrors.dateOfBirth = "Date of birth is required.";
      isValid = false;
    }

    if (!profileFormValues.gender) {
      newProfileFormErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!profileFormValues.maritalStatus) {
      newProfileFormErrors.maritalStatus = "Civil status is required.";
      isValid = false;
    }

    if (!profileFormValues.address) {
      newProfileFormErrors.address = "Address is required.";
      isValid = false;
    }

    if (!profileFormValues.mobileNumber) {
      newProfileFormErrors.mobileNumber = "Mobile number is required.";
      isValid = false;
    }

    if (
      profileFormValues.mobileNumber &&
      !isMobileNumberValid(profileFormValues.mobileNumber)
    ) {
      newProfileFormErrors.mobileNumber = "Invalid mobile number format";
      isValid = false;
    }

    if (!formValues.profileType) {
      newRecordFormErrors.profileType = "Profile type is required.";
      isValid = false;
    }

    if (!formValues.department) {
      newRecordFormErrors.department = "Department is required.";
      isValid = false;
    }

    if (formValues.height && !isHeightValid(formValues.height)) {
      newRecordFormErrors.height = "Invalid height format.";
      isValid = false;
    }

    if (formValues.weight && !isWeightValid(formValues.weight)) {
      newRecordFormErrors.weight = "Invalid weight format.";
      isValid = false;
    }

    if (
      formValues.bloodPressure &&
      !isBloodPressureValid(formValues.bloodPressure)
    ) {
      newRecordFormErrors.bloodPressure = "Invalid blood pressure format.";
      isValid = false;
    }

    setProfileFormErrors(newProfileFormErrors);
    setRecordFormErrors(newRecordFormErrors);
    return isValid;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {globalError && (
        <div role="alert" className="alert alert-error rounded-none">
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
          <span className="text-sm">{globalError}</span>
        </div>
      )}
      <form className="p-4 flex flex-col" onSubmit={handleOnSubmit}>
        <div className="flex justify-center items-center space-x-4">
          <div className="w-72">
            <div className="flex items-center justify-evenly">
              {profileTypes.map((type, index) => (
                <label key={index} className="label cursor-pointer">
                  <input
                    id="form_profileType"
                    name="form_profileType"
                    type="radio"
                    className="radio mx-2 radio-sm"
                    value={type.name}
                    checked={formValues.profileType === type.name}
                    onChange={handleOnChange}
                  />
                  <span className="label-text">{type.name}</span>
                </label>
              ))}
            </div>
            {recordFormErrors.profileType && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {recordFormErrors.profileType}
                </span>
              </div>
            )}
          </div>
          <div className="w-72">
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Purpose of Visit</span>
              </div>
              {isLoading ? (
                <div className="flex justify-center">
                  <span className="loading loading-spinner loading-xs text-primary"></span>
                </div>
              ) : (
                <select
                  name="form_department"
                  id="form_department"
                  className={
                    recordFormErrors.department
                      ? "input input-sm input-bordered input-error rounded-none w-full px-3"
                      : "input input-sm input-bordered rounded-none w-full px-3"
                  }
                  value={formValues.department}
                  onChange={handleOnChange}
                >
                  <option value="">Select department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </select>
              )}
              {recordFormErrors.department && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {recordFormErrors.department}
                  </span>
                </div>
              )}
            </label>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-center items-center space-x-4">
          <div className="w-full">
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                id="profile_firstName"
                name="profile_firstName"
                type="text"
                className={
                  profileFormErrors.firstName
                    ? "input input-sm input-bordered input-error rounded-none w-full px-3"
                    : "input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
                }
                value={profileFormValues.firstName}
                onChange={handleOnChange}
              />
              {profileFormErrors.firstName && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.firstName}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control w-72 mt-1.5">
              <div className="label">
                <span className="label-text">Middle Name</span>
              </div>
              <input
                id="profile_middleName"
                name="profile_middleName"
                type="text"
                className="input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
                value={profileFormValues.middleName}
                onChange={handleOnChange}
              />
            </label>
            <div className="flex items-center">
              <div className="w-full">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    id="profile_lastName"
                    name="profile_lastName"
                    type="text"
                    className={
                      profileFormErrors.lastName
                        ? "input input-sm input-bordered input-error rounded-none w-72 py-1.5 px-3"
                        : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
                    }
                    value={profileFormValues.lastName}
                    onChange={handleOnChange}
                  />
                  {profileFormErrors.lastName && (
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {profileFormErrors.lastName}
                      </span>
                    </div>
                  )}
                </label>
              </div>
              <div className="w-16 ml-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Suffix</span>
                  </div>
                  <select
                    id="profile_suffix"
                    name="profile_suffix"
                    className="input input-sm input-bordered rounded-none w-full px-3"
                    value={profileFormValues.suffix}
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
              </div>
            </div>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Date of Birth</span>
              </div>
              <input
                id="profile_dateOfBirth"
                name="profile_dateOfBirth"
                type="date"
                className={
                  profileFormErrors.dateOfBirth
                    ? "input input-sm input-bordered input-error rounded-none w-72 py-1.5 px-3"
                    : "input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
                }
                value={profileFormValues.dateOfBirth}
                onChange={handleOnChange}
              />
              {profileFormErrors.dateOfBirth && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.dateOfBirth}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select
                id="profile_gender"
                name="profile_gender"
                className={
                  profileFormErrors.gender
                    ? "input input-sm input-bordered input-error rounded-none w-72 px-3"
                    : "input input-sm input-bordered rounded-none w-72 px-3"
                }
                value={profileFormValues.gender}
                onChange={handleOnChange}
              >
                <option value="">Select gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="NON-BINARY">NON-BINARY</option>
                <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
              </select>
              {profileFormErrors.gender && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.gender}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Civil Status</span>
              </div>
              <select
                id="profile_maritalStatus"
                name="profile_maritalStatus"
                className={
                  profileFormErrors.maritalStatus
                    ? "input input-sm input-bordered input-error rounded-none w-72 px-3"
                    : "input input-sm input-bordered rounded-none w-72 px-3"
                }
                value={profileFormValues.maritalStatus}
                onChange={handleOnChange}
              >
                <option value="">Select civil status</option>
                <option value="SINGLE">SINGLE</option>
                <option value="MARRIED">MARRIED</option>
                <option value="DIVORCED">DIVORCED</option>
                <option value="WIDOWED">WIDOWED</option>
                <option value="SEPARATED">SEPARATED</option>
                <option value="DOMESTIC PARTNERSHIP">
                  DOMESTIC PARTNERSHIP
                </option>
              </select>
              {profileFormErrors.maritalStatus && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.maritalStatus}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Mobile Number</span>
                <span className="label-text-alt text-gray-600">
                  (e.g. 09123456789)
                </span>
              </div>
              <input
                id="profile_mobileNumber"
                name="profile_mobileNumber"
                type="text"
                className={
                  profileFormErrors.mobileNumber
                    ? "input input-sm input-bordered input-error rounded-none w-72 py-1.5 px-3"
                    : "input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
                }
                value={profileFormValues.mobileNumber}
                onChange={handleOnChange}
              />
              {profileFormErrors.mobileNumber && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.mobileNumber}
                  </span>
                </div>
              )}
            </label>
          </div>
          <div className="w-72">
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <textarea
                id="profile_address"
                name="profile_address"
                rows={5}
                className={
                  profileFormErrors.address
                    ? "textarea textarea-sm textarea-bordered textarea-error rounded-none w-72 py-1.5 px-3"
                    : "textarea textarea-sm textarea-bordered rounded-none w-72 py-1.5 px-3"
                }
                value={profileFormValues.address}
                onChange={handleOnChange}
              ></textarea>
              {profileFormErrors.address && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {profileFormErrors.address}
                  </span>
                </div>
              )}
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Occupation (Optional)</span>
              </div>
              <input
                id="profile_occupation"
                name="profile_occupation"
                type="text"
                className="input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
                value={profileFormValues.occupation}
                onChange={handleOnChange}
              />
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">
                  Highest Level of Education (Optional)
                </span>
              </div>
              <select
                id="profile_educationalBackground"
                name="profile_educationalBackground"
                className="input input-sm input-bordered rounded-none w-72 px-3"
                value={profileFormValues.educationalBackground}
                onChange={handleOnChange}
              >
                <option value="">Select highest level of education</option>
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
                <option value="POSTGRADUATE STUDIES">
                  POSTGRADUATE STUDIES
                </option>
              </select>
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">Household Size (Optional)</span>
              </div>
              <input
                id="profile_householdSize"
                name="profile_householdSize"
                type="number"
                min={0}
                className="input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
                value={profileFormValues.householdSize ?? 0}
                onChange={handleOnChange}
              />
            </label>
            <label className="form-control w-72">
              <div className="label">
                <span className="label-text">
                  Household Income Bracket (Optional)
                </span>
              </div>
              <select
                id="profile_incomeBracket"
                name="profile_incomeBracket"
                className="input input-sm input-bordered rounded-none w-72 px-3"
                value={profileFormValues.incomeBracket}
                onChange={handleOnChange}
              >
                <option value="">Select household income bracket</option>
                <option value="POOR">Below ₱10,957 monthly income</option>
                <option value="LOW INCOME (BUT NOT POOR)">
                  ₱10,957 to ₱21,914 monthly income
                </option>
                <option value="LOWER MIDDLE CLASS">
                  ₱21,914 to ₱43,828 monthly income
                </option>
                <option value="MIDDLE CLASS">
                  ₱43,828 to ₱76,66 monthly income
                </option>
                <option value="UPPER MIDDLE INCOME">
                  ₱76,669 to ₱131,484 monthly income
                </option>
                <option value="HIGH INCOME (BUT NOT RICH)">
                  ₱131,483 to ₱219,140 monthly income
                </option>
                <option value="RICH">₱ 219,140 and above monthly income</option>
              </select>
            </label>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col justify-center items-center">
          <label className="form-control w-72">
            <div className="label">
              <span className="label-text">Height (Optional)</span>
              <span className="label-text-alt text-gray-600">(cm)</span>
            </div>
            <input
              id="form_height"
              name="form_height"
              type="text"
              className={
                recordFormErrors.height
                  ? "input input-sm input-bordered input-error rounded-none w-72 py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
              }
              value={formValues.height}
              onChange={handleOnChange}
            />
            {recordFormErrors.height && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {recordFormErrors.height}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-72">
            <div className="label">
              <span className="label-text">Weight (Optional)</span>
              <span className="label-text-alt text-gray-600">(kg)</span>
            </div>
            <input
              id="form_weight"
              name="form_weight"
              type="text"
              className={
                recordFormErrors.weight
                  ? "input input-sm input-bordered input-error rounded-none w-72 py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
              }
              value={formValues.weight}
              onChange={handleOnChange}
            />
            {recordFormErrors.weight && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {recordFormErrors.weight}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-72">
            <div className="label">
              <span className="label-text">Blood Pressure (Optional)</span>
              <span className="label-text-alt text-gray-600">
                (e.g. 120/80)
              </span>
            </div>
            <input
              id="form_bloodPressure"
              name="form_bloodPressure"
              type="text"
              className={
                recordFormErrors.bloodPressure
                  ? "input input-sm input-bordered input-error rounded-none w-72 py-1.5 px-3"
                  : "input input-sm input-bordered rounded-none w-72 py-1.5 px-3"
              }
              value={formValues.bloodPressure}
              onChange={handleOnChange}
            />
            {recordFormErrors.bloodPressure && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {recordFormErrors.bloodPressure}
                </span>
              </div>
            )}
          </label>
        </div>
        <div className="flex justify-end gap-x-1.5 py-1.5 mt-4">
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={handleGoBackClick}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="btn btn-sm btn-primary rounded-none"
            value={isEditing ? "Update" : "Add"}
          />
        </div>
      </form>
    </div>
  );
};

export default HealthRecordForm;
