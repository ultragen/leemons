import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph, RadioGroup, Title } from '@bubbles-ui/components';

function ProgramTreeType({ messages, data, value, onChange }) {
  return (
    <Box>
      <Title order={4}>{messages.title}</Title>
      <Paragraph>{messages.description1}</Paragraph>
      <Paragraph>
        <strong>{messages.note}</strong>
        {messages.description2}
      </Paragraph>
      <RadioGroup direction="column" value={value} data={data} onChange={onChange} />
    </Box>
  );
}

ProgramTreeType.propTypes = {
  messages: PropTypes.object,
  value: PropTypes.number,
  onChange: PropTypes.func,
  data: PropTypes.array,
};

export { ProgramTreeType };