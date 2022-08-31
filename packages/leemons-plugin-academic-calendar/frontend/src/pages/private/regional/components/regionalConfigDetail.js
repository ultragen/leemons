import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  ContextContainer,
  createStyles,
  DatePicker,
  Paragraph,
  Select,
  Stack,
  TableInput,
  TextInput,
  Title,
} from '@bubbles-ui/components';
import ColorBall from '@academic-calendar/components/ColorBall';
import useRequestErrorMessage from '@common/useRequestErrorMessage';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
import { useStore } from '@common';
import { saveRegionalConfig } from '@academic-calendar/request/regional-config';

const useStyle = createStyles((theme) => ({
  root: {
    padding: theme.spacing[5],
    maxWidth: 700,
    width: '100%',
  },
}));

export function RegionalConfigDetail({ config, t, calendars, center, onSave }) {
  const [, , , getErrorMessage] = useRequestErrorMessage();
  const [store, render] = useStore();
  const { classes } = useStyle();
  const isNew = !config.id;
  const regionalCalendars = React.useMemo(() => {
    const result = [];
    _.forEach(calendars, (calendar) => {
      if (calendar.regionalEvents?.length) {
        result.push({
          label: calendar.name,
          value: calendar.id,
        });
      }
    });
    return result;
  }, [calendars]);

  const tableConfig = React.useMemo(
    () => ({
      columns: [
        {
          Header: `${t('name')}*`,
          accessor: 'name',
          input: {
            node: <TextInput required />,
            rules: { required: t('requiredField') },
          },
          editable: false,
        },
        {
          Header: `${t('init')}*`,
          accessor: 'startDate',
          input: {
            node: <DatePicker required />,
            rules: { required: t('requiredField') },
          },
          valueRender: (value) => <>{new Date(value).toLocaleDateString()}</>,
        },
        {
          Header: `${t('end')}*`,
          accessor: 'endDate',
          input: {
            node: <DatePicker required />,
            rules: { required: t('requiredField') },
          },
          valueRender: (value) => <>{new Date(value).toLocaleDateString()}</>,
        },
      ],
      labels: {
        add: t('add'),
        remove: t('remove'),
        edit: t('edit'),
        accept: t('accept'),
        cancel: t('cancel'),
      },
    }),
    []
  );

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...config,
      regionalEvents:
        _.map(config.regionalEvents, (e) => ({
          ...e,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
        })) || [],
      daysOffEvents:
        _.map(config.daysOffEvents, (e) => ({
          ...e,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
        })) || [],
      localEvents:
        _.map(config.localEvents, (e) => ({
          ...e,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
        })) || [],
    },
  });

  function save() {
    handleSubmit(async (data) => {
      try {
        store.saving = true;
        render();

        await saveRegionalConfig({
          ...data,
          center,
        });

        addSuccessAlert(t('saved'));
        onSave();
      } catch (err) {
        addErrorAlert(getErrorMessage(err));
      }
      store.saving = false;
      render();
    })();
  }

  const regionalEventsRel = watch('regionalEventsRel');
  const regionalEvents = watch('regionalEvents');

  return (
    <ContextContainer divided className={classes.root}>
      <ContextContainer>
        <Title order={3}>{isNew ? t('newRegionalCalendar') : t('edit')}</Title>
        <Controller
          control={control}
          name="name"
          rules={{ required: t('nameRequired') }}
          render={({ field }) => (
            <TextInput {...field} error={errors.name} required label={t('name')} />
          )}
        />
        <Box>
          <Title order={3}>
            <ColorBall
              sx={(theme) => ({ marginRight: theme.spacing[4] })}
              colors={['#DEEDE4', '#D5E4DB']}
              withBorder
            />
            {t('regionalEvents')}
          </Title>
          <Paragraph>{t('regionalEventsDescription')}</Paragraph>
        </Box>
        {!regionalEvents.length && regionalCalendars.length ? (
          <Controller
            control={control}
            name="regionalEventsRel"
            render={({ field }) => (
              <Select
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  setValue('regionalEvents', []);
                }}
                data={regionalCalendars}
                clearable
                placeholder={t('useEventsFromPlaceholder')}
                label={t('useEventsFrom')}
              />
            )}
          />
        ) : null}

        {!regionalEventsRel ? (
          <Controller
            control={control}
            name="regionalEvents"
            render={({ field }) => (
              <TableInput
                {...tableConfig}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue('regionalEventsRel', null);
                }}
                data={field.value}
                editable
                resetOnAdd
                sortable={false}
              />
            )}
          />
        ) : null}

        <Title order={3}>
          <ColorBall
            sx={(theme) => ({ marginRight: theme.spacing[4] })}
            colors={['#E4DDF7', '#DBD4ED']}
            rotate={90}
            withBorder
          />
          {t('localEvents')}
        </Title>
        <Controller
          control={control}
          name="localEvents"
          render={({ field }) => (
            <TableInput
              {...tableConfig}
              {...field}
              data={field.value}
              editable
              resetOnAdd
              sortable={false}
            />
          )}
        />
        <Box>
          <Title order={3}>
            <ColorBall
              sx={(theme) => ({ marginRight: theme.spacing[4] })}
              colors={['#F6E1F3', '#ECD8E9']}
              rotate={-45}
              withBorder
            />
            {t('daysOffEvents')}
          </Title>
          <Paragraph>{t('daysOffEventsDescription')}</Paragraph>
        </Box>
        <Controller
          control={control}
          name="daysOffEvents"
          render={({ field }) => (
            <TableInput
              {...tableConfig}
              {...field}
              data={field.value}
              editable
              resetOnAdd
              sortable={false}
            />
          )}
        />
      </ContextContainer>
      <Stack fullWidth justifyContent="end">
        <Button onClick={save} loading={store.saving}>
          {t('save')}
        </Button>
      </Stack>
    </ContextContainer>
  );
}

RegionalConfigDetail.propTypes = {
  config: PropTypes.object,
  t: PropTypes.func,
  calendars: PropTypes.array,
  onSave: PropTypes.func,
  center: PropTypes.string,
};