import _ from 'lodash';
import Router from 'next/router';
import { useEffect } from 'react';
import OnboarderFormAmazonSes from '@provider-emails-amazon-ses/onboarder-form';

export default function EmailProvider() {
  async function checkProvider() {
    try {
      const { providers } = await leemons.api('emails/providers');
      const index = _.findIndex(providers, Router.router.query);
      if (index < 0) {
        Router.push('/onboarding/email-provider');
      }
    } catch (err) {
      console.error('En el error', err);
    }
  }

  useEffect(() => {
    checkProvider();
  }, []);

  return (
    <>
      <OnboarderFormAmazonSes />
    </>
  );
}