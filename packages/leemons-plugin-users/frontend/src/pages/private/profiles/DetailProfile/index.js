import * as _ from 'lodash';
import useTranslate, { getLocalizationsByArrayOfItems } from '@multilanguage/useTranslate';
import { useForm } from 'react-hook-form';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTranslationKey as getTranslationKeyActions } from '@users/actions/getTranslationKey';
import { getTranslationKey as getTranslationKeyPermissions } from '@users/permissions/getTranslationKey';
import {
  addProfileRequest,
  getProfileRequest,
  listActionsRequest,
  listPermissionsRequest,
  updateProfileRequest,
} from '@users/request';
import { withLayout } from '@layout/hoc';
import { goDetailProfilePage, goListProfilesPage } from '@users/navigate';
import {
  Button,
  FormControl,
  ImageLoader,
  Input,
  Modal,
  PageContainer,
  PageHeader,
  Select,
  Tab,
  Table,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  useModal,
} from 'leemons-ui';
import tLoader from '@multilanguage/helpers/tLoader';
import useCommonTranslate from '@multilanguage/helpers/useCommonTranslate';
import prefixPN from '@users/helpers/prefixPN';
import useRequestErrorMessage from '@common/useRequestErrorMessage';
import { useDatasetItemDrawer } from '@dataset/components/DatasetItemDrawer';
import { getDatasetSchemaRequest, removeDatasetFieldRequest } from '@dataset/request';
import getDatasetAsArrayOfProperties from '@dataset/helpers/getDatasetAsArrayOfProperties';
import { useAsync } from '@common/useAsync';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/outline';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
import PlatformLocales from '@multilanguage/components/PlatformLocales';
import getProfileTranslations from '@users/request/getProfileTranslations';
import hooks from 'leemons-hooks';
import MainMenuDropItem from '@menu-builder/components/mainMenu/mainMenuDropItem';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function DatasetTabs({ profile, t, isEditMode }) {
  const [loading, setLoading] = useState(true);
  const [tableItems, setTableItems] = useState([]);
  const [item, setItem] = useState(null);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [toggle, DatasetItemDrawer] = useDatasetItemDrawer();
  const { t: tCommonTypes } = useCommonTranslate('form_field_types');
  const [error, setError, ErrorAlert, getErrorMessage] = useRequestErrorMessage();

  function newItem() {
    setItem(null);
    toggle();
  }

  function openItem(_item) {
    setItem(_item);
    toggle();
  }

  const load = useMemo(
    () => () => getDatasetSchemaRequest(`profile.${profile.id}`, 'plugins.users'),
    []
  );

  const onSuccess = useMemo(
    () =>
      ({ dataset }) => {
        setTableItems(getDatasetAsArrayOfProperties(dataset));
        setLoading(false);
      },
    []
  );

  const onError = useMemo(
    () => (e) => {
      // ES: 4001 codigo de que aun no existe schema, como es posible ignoramos el error
      if (e.code !== 4001) {
        setError(e);
      }
      setLoading(false);
    },
    []
  );

  useAsync(load, onSuccess, onError);

  async function reload() {
    try {
      setLoading(true);
      await onSuccess(await load());
    } catch (e) {
      onError(e);
    }
  }

  function onSave() {
    reload();
  }

  const [modal, toggleModal] = useModal({
    animated: true,
    title: t('remove_modal.title'),
    message: t('remove_modal.message'),
    cancelLabel: t('remove_modal.cancel'),
    actionLabel: t('remove_modal.action'),
    onAction: async () => {
      try {
        await removeDatasetFieldRequest(`profile.${profile.id}`, 'plugins.users', itemToRemove.id);
        addSuccessAlert(t('dataset_tab.deleted_done'));
        reload();
      } catch (e) {
        addErrorAlert(getErrorMessage(e));
      }
    },
  });

  function removeItem(_item) {
    setItemToRemove(_item);
    toggleModal();
  }

  const tableHeaders = useMemo(() => {
    const result = [
      {
        Header: t('dataset_tab.table.name'),
        accessor: (field) => (
          <div className="text-left">
            {field.schema.frontConfig.name} {field.schema.frontConfig.required ? '*' : ''}
          </div>
        ),
        className: 'text-left',
      },
      {
        Header: t('dataset_tab.table.description'),
        accessor: 'description',
        className: 'text-left',
      },
      {
        Header: t('dataset_tab.table.type'),
        accessor: (field) => (
          <div className="text-center">{tCommonTypes(field.schema.frontConfig.type)}</div>
        ),
        className: 'text-center',
      },
    ];
    if (isEditMode) {
      result.push({
        Header: t('dataset_tab.table.actions'),
        accessor: (field) => (
          <div className="text-center">
            <Button color="primary" text onClick={() => openItem(field)}>
              {t('dataset_tab.table.edit')}
            </Button>
            <Button color="primary" text onClick={() => removeItem(field)}>
              {t('dataset_tab.table.delete')}
            </Button>
          </div>
        ),
        className: 'text-center',
      });
    }
    return result;
  }, [t, tCommonTypes, isEditMode]);

  return (
    <>
      <Modal {...modal} />
      <div className="bg-primary-content">
        <PageContainer className="pt-0">
          <ErrorAlert />
          {!loading && !error ? (
            <div className="pt-6 mb-6 flex flex-row justify-between items-center">
              <div className="text-base text-secondary">{t(`dataset_tab.description`)}</div>
              {isEditMode ? (
                <Button color="secondary" onClick={newItem}>
                  <PlusIcon className="w-6 h-6 mr-1" />
                  {t('dataset_tab.add_field')}
                </Button>
              ) : null}

              <DatasetItemDrawer
                locationName={`profile.${profile.id}`}
                pluginName="plugins.users"
                item={item}
                onSave={onSave}
              />
            </div>
          ) : null}
        </PageContainer>
      </div>
      {!loading && !error ? (
        <PageContainer>
          <div className="bg-primary-content p-4">
            <div>
              {tableItems && tableItems.length ? (
                <Table columns={tableHeaders} data={tableItems} />
              ) : (
                <div className="text-center">{t('dataset_tab.no_data_in_table')}</div>
              )}
            </div>
          </div>
        </PageContainer>
      ) : null}
    </>
  );
}

DatasetTabs.propTypes = {
  profile: PropTypes.any,
  t: PropTypes.func,
  isEditMode: PropTypes.bool,
};

function PermissionsTabs({ t, profile, onPermissionsChange = () => {}, isEditMode }) {
  const dataTable = useRef([]);
  const initialArrayPermissions = useRef([]);
  const [selectedPermission, setSelectedPermission] = useState('all');
  const [selectPermissions, setSelectPermissions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [actions, setActions] = useState(null);
  const [actionT, setActionT] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [permissionT, setPermissionT] = useState(null);

  const sendPermissionChange = () => {
    onPermissionsChange(
      _.map(dataTable.current, ({ name, permissionName, ...rest }) => {
        const actionNames = [];
        _.forIn(rest, ({ checked }, key) => {
          if (checked) actionNames.push(key);
        });
        return {
          permissionName,
          actionNames,
        };
      })
    );
  };

  useEffect(() => {
    if (selectedPermission !== 'all') {
      setPermissions(_.filter(initialArrayPermissions.current, { pluginName: selectedPermission }));
    } else {
      setPermissions(initialArrayPermissions.current);
    }
  }, [selectedPermission]);

  const getPermissionsForTable = (editMode) =>
    permissions.map((permission) => {
      const response = {
        name: permissionT[getTranslationKeyPermissions(permission.permissionName, 'name')],
        permissionName: permission.permissionName,
      };
      actions.map(({ actionName }) => {
        if (permission.actions.indexOf(actionName) >= 0) {
          let cPermission = null;
          if (dataTable.current) {
            cPermission = _.find(dataTable.current, {
              permissionName: permission.permissionName,
            });
          }
          if (editMode) {
            response[actionName] = {
              type: 'checkbox',
              // eslint-disable-next-line no-nested-ternary
              checked: cPermission
                ? cPermission[actionName].checked
                : profile && profile.permissions[permission.permissionName]
                ? profile.permissions[permission.permissionName].indexOf(actionName) >= 0
                : false,
            };
          } else {
            response[actionName] = () => {
              // eslint-disable-next-line no-nested-ternary
              const checked = cPermission
                ? cPermission[actionName].checked
                : profile && profile.permissions[permission.permissionName]
                ? profile.permissions[permission.permissionName].indexOf(actionName) >= 0
                : false;
              if (checked)
                return (
                  <div className="text-center text-primary">
                    <CheckCircleIcon className="w-7 h-7 m-auto" />
                  </div>
                );
              return null;
            };
          }
        }
        return null;
      });
      return response;
    });

  useEffect(() => {
    if (permissions && actions && permissionT) {
      setTableData(getPermissionsForTable(isEditMode));
      const data = getPermissionsForTable(true);
      if ((!dataTable.current || !dataTable.current.length) && data.length)
        dataTable.current = data;
    }
  }, [profile, permissions, actions, permissionT, isEditMode]);

  async function _setTableData(e) {
    _.forEach(e, (d) => {
      const index = _.findIndex(dataTable.current, { permissionName: d.permissionName });
      if (index >= 0) {
        dataTable.current[index] = d;
      }
    });
    sendPermissionChange();
    setTableData(e);
  }

  async function _setSelectPermissions() {
    const perms = _.uniqBy(initialArrayPermissions.current, 'pluginName');
    setSelectPermissions(
      _.map(perms, ({ pluginName }) => ({
        pluginName,
        name: pluginName.split('.')[1],
      }))
    );
  }

  async function getPermissions() {
    const response = await listPermissionsRequest();
    const translate = await getLocalizationsByArrayOfItems(response.permissions, (permission) =>
      getTranslationKeyPermissions(permission.permissionName, 'name')
    );

    initialArrayPermissions.current = _.orderBy(response.permissions, ['permissionName']);
    setPermissionT(translate.items);
    setPermissions(initialArrayPermissions.current);
    _setSelectPermissions();
  }

  async function getActions() {
    const response = await listActionsRequest();
    const translate = await getLocalizationsByArrayOfItems(response.actions, (action) =>
      getTranslationKeyActions(action.actionName, 'name')
    );

    setActionT(translate.items);
    setActions(response.actions);
  }

  useEffect(() => {
    getPermissions();
    getActions();
  }, []);

  const tableHeaders = useMemo(() => {
    const result = [
      {
        Header: t('leemon'),
        accessor: 'name',
        className: 'text-left',
      },
    ];
    if (actions && actionT) {
      _.forIn(actions, (action) => {
        result.push({
          Header: actionT[getTranslationKeyActions(action.actionName, 'name')],
          accessor: action.actionName,
          className: 'text-center',
        });
      });
    }
    return result;
  }, [actionT, actions, t]);

  return (
    <>
      <div className="bg-primary-content p-4">
        <PageContainer>
          <div className="text-secondary font-semibold text-sm uppercase mb-5">
            {t('permissions')}
          </div>
          <div className="flex flex-row max-w-screen-md">
            <div className="w-4/12 font-medium">{t('select_permissions')}</div>
            <div className="w-8/12">
              <Select
                value={selectedPermission}
                onChange={(e) => {
                  setSelectedPermission(e.target.value);
                }}
                outlined={true}
                className="w-full max-w-xs"
              >
                <option value="all">{t('permissions_all')}</option>
                {selectPermissions.map(({ pluginName, name }) => (
                  <option key={pluginName} value={pluginName}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </PageContainer>
      </div>
      <PageContainer>
        <div className="bg-primary-content p-4">
          <Table
            columns={tableHeaders}
            data={tableData}
            setData={(e) => (isEditMode ? _setTableData(e) : null)}
          />
        </div>
      </PageContainer>
    </>
  );
}

PermissionsTabs.propTypes = {
  t: PropTypes.func,
  profile: PropTypes.any,
  onPermissionsChange: PropTypes.func,
  isEditMode: PropTypes.bool,
};

function ProfileDetail() {
  const [translations] = useTranslate({ keysStartsWith: prefixPN('detail_profile') });
  const t = tLoader(prefixPN('detail_profile'), translations);
  const { t: tCommonHeader } = useCommonTranslate('page_header');
  const { t: tCommonForm } = useCommonTranslate('forms');

  const history = useHistory();
  const { uri } = useParams();

  const {
    register,
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError, ErrorAlert, getErrorMessage] = useRequestErrorMessage();

  const [modal, toggleModal] = useModal({
    animated: true,
    title: t('options_modal.title'),
    cancelLabel: t('options_modal.cancel'),
    actionLabel: t('options_modal.accept'),
  });

  useEffect(() => {
    if (!uri) {
      setIsEditMode(true);
    }
  }, []);

  async function saveProfile(data) {
    try {
      setSaveLoading(true);
      let response;

      if (profile && profile.id) {
        response = await updateProfileRequest({
          ...data,
          id: profile.id,
        });
        addSuccessAlert(t('update_done'));
      } else {
        response = await addProfileRequest(data);
        addSuccessAlert(t('save_done'));
      }
      await hooks.fireEvent('user:update:permissions', profile);
      setSaveLoading(false);
      goDetailProfilePage(history, response.profile.uri);
    } catch (e) {
      addErrorAlert(getErrorMessage(e));
      setSaveLoading(false);
    }
  }

  async function getProfile(_uri) {
    try {
      setLoading(true);
      const response = await getProfileRequest(_uri);

      setValue('name', response.profile.name);
      setValue('description', response.profile.description);

      const perms = [];
      _.forIn(response.profile.permissions, (actionNames, permissionName) => {
        perms.push({ actionNames, permissionName });
      });

      setPermissions(perms);
      setProfile(response.profile);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (uri) {
      getProfile(uri);
      setIsEditMode(false);
    } else {
      setLoading(false);
    }
  }, [uri]);

  const onSubmit = (data) => {
    saveProfile({ ...data, permissions });
  };

  const onEditButton = () => {
    setIsEditMode(true);
  };

  const onCancelButton = () => {
    if (profile?.id) {
      setIsEditMode(false);
    } else {
      goListProfilesPage(history);
    }
  };

  const showDefaultLocaleWarning = useMemo(() => !getValues('name'), [getValues()]);

  const Name = () => (
    <MainMenuDropItem item={{ key: `profile.${profile?.id}` }}>
      {({ isDragging, canDrag }) => (
        <div className={`relative ${canDrag ? 'pl-5 hover:text-primary cursor-move' : ''}`}>
          {canDrag ? (
            <div
              className={`absolute left-0 top-2/4 transform -translate-y-1/2 ${
                isDragging ? 'text-primary' : ''
              }`}
              style={{ width: '14px', height: '8px' }}
            >
              <ImageLoader className="stroke-current" src={'/public/assets/svgs/re-order.svg'} />
            </div>
          ) : null}
          <span className="text-secondary">{watch('name')}</span>
        </div>
      )}
    </MainMenuDropItem>
  );

  return (
    <>
      {!error && !loading ? (
        <>
          <Modal {...modal}>
            <div className="text-sm text-secondary">{t('options_modal.description')}</div>
            <div className="pt-6 mb-4">
              <PlatformLocales showWarning={showDefaultLocaleWarning} warningIsError={isSubmitted}>
                <LocaleTab
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
                  register={register}
                  tCommonForm={tCommonForm}
                  t={t}
                  profile={profile}
                  isEditMode={isEditMode}
                />
              </PlatformLocales>
            </div>
          </Modal>

          <form onSubmit={handleSubmit(onSubmit)}>
            <PageHeader
              registerFormTitle={
                isEditMode ? register('name', { required: tCommonForm('required') }) : null
              }
              registerFormTitleErrors={errors.name}
              titlePlaceholder={t('profile_name')}
              title={<Name />}
              saveButton={isEditMode ? tCommonHeader('save') : null}
              saveButtonLoading={saveLoading}
              cancelButton={isEditMode ? tCommonHeader('cancel') : null}
              onCancelButton={onCancelButton}
              editButton={isEditMode ? null : tCommonHeader('edit')}
              onEditButton={onEditButton}
            />

            <div className="bg-primary-content">
              <PageContainer>
                <div className="flex flex-row max-w-screen-md">
                  {isEditMode ? (
                    <>
                      <div className="w-4/12 font-medium">{t('description')}</div>
                      <div className="w-8/12">
                        <Textarea className="w-full" outlined={true} {...register('description')} />
                      </div>
                    </>
                  ) : (
                    <div className="page-description">{watch('description')}</div>
                  )}
                </div>

                <Button type="button" className="mt-6" color="primary" text onClick={toggleModal}>
                  {t('translations')}
                  {showDefaultLocaleWarning ? (
                    <span
                      className={`${
                        isSubmitted ? 'bg-error' : 'bg-warning'
                      } w-2 h-2 rounded-full  mt-2 ml-2 self-start`}
                    />
                  ) : null}
                </Button>
              </PageContainer>
            </div>
          </form>

          <Tabs>
            <div className="bg-primary-content">
              <PageContainer>
                <TabList>
                  <Tab id={`id-permissions`} panelId={`panel-permissions`}>
                    {t('permissions')}
                  </Tab>
                  <Tab id={`id-dataset`} panelId={`panel-dataset`} disabled={!profile?.id}>
                    {t('dataset')}
                  </Tab>
                </TabList>
              </PageContainer>
            </div>

            <TabPanel id={`panel-permissions`} tabId={`id-permissions`}>
              <PermissionsTabs
                t={t}
                profile={profile}
                onPermissionsChange={setPermissions}
                isEditMode={isEditMode}
              />
            </TabPanel>

            <TabPanel id={`panel-dataset`} tabId={`id-dataset`}>
              <DatasetTabs t={t} profile={profile} isEditMode={isEditMode} />
            </TabPanel>
          </Tabs>
        </>
      ) : (
        <ErrorAlert />
      )}
    </>
  );
}

function LocaleTab({
  localeConfig,
  errors,
  setValue,
  watch,
  register,
  tCommonForm,
  t,
  profile,
  getValues,
  isEditMode,
}) {
  let nameKey = `translations.name.${localeConfig.currentLocale.code}`;
  let descriptionKey = `translations.description.${localeConfig.currentLocale.code}`;
  let nameRegister = {};
  let descriptionRegister = {};
  const nameOptions = {};
  if (localeConfig.currentLocaleIsDefaultLocale) {
    nameOptions.required = tCommonForm('required');
    nameKey = 'name';
    descriptionKey = 'description';
    nameRegister = { onChange: (e) => setValue(nameKey, e.target.value), value: watch('name') };
    descriptionRegister = {
      onChange: (e) => setValue(descriptionKey, e.target.value),
      value: watch('description'),
    };
  } else {
    nameRegister = { ...register(nameKey, nameOptions) };
    descriptionRegister = { ...register(descriptionKey) };
  }

  useEffect(() => {
    (async () => {
      if (profile && profile.id) {
        const name = getValues(nameKey);
        const description = getValues(descriptionKey);
        if (!name || !description) {
          const values = await getProfileTranslations(profile.id, localeConfig.currentLocale.code);
          if (!name) setValue(nameKey, values.name);
          if (!description) setValue(descriptionKey, values.description);
        }
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <FormControl
        label={t('options_modal.profile_name')}
        className="w-full"
        formError={_.get(errors, nameKey)}
      >
        {isEditMode ? (
          <Input className="w-full" outlined={true} {...nameRegister} />
        ) : (
          watch(nameKey)
        )}
      </FormControl>
      <FormControl
        label={t('options_modal.profile_description')}
        className="w-full"
        formError={_.get(errors, descriptionKey)}
      >
        {isEditMode ? (
          <Textarea className="w-full" outlined={true} {...descriptionRegister} />
        ) : (
          watch(descriptionKey)
        )}
      </FormControl>
    </div>
  );
}

LocaleTab.propTypes = {
  localeConfig: PropTypes.any,
  errors: PropTypes.any,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  register: PropTypes.func,
  tCommonForm: PropTypes.func,
  t: PropTypes.func,
  profile: PropTypes.any,
  getValues: PropTypes.func,
  isEditMode: PropTypes.bool,
};
export default withLayout(ProfileDetail);