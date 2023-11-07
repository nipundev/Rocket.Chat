import { Box, Skeleton } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveConnections } from '../../../../hooks/useActiveConnections';
import type { CardProps } from '../FeatureUsageCard';
import FeatureUsageCard from '../FeatureUsageCard';

const getLimits = ({ max, current }: { max: number; current: number }) => {
	const total = max || 0;
	const used = current || 0;
	const available = total - used;

	const exceedLimit = used >= total;

	return {
		total,
		used,
		available,
		exceedLimit,
	};
};

const ActiveSessionsCard = (): ReactElement => {
	const { t } = useTranslation();
	const result = useActiveConnections();

	const card: CardProps = {
		title: t('ActiveSessions'),
		infoText: t('ActiveSessions_InfoText'),
		showUpgradeButton: true,
	};

	if (result.isLoading || result.isError) {
		return (
			<FeatureUsageCard card={card}>
				<Skeleton variant='rect' width='x112' height='x112' />
			</FeatureUsageCard>
		);
	}

	const { total, used, available, exceedLimit } = getLimits(result.data);

	return (
		<FeatureUsageCard card={{ ...card, showUpgradeButton: exceedLimit }}>
			<Box textAlign='center'>
				<Box fontScale='h1' color={exceedLimit ? 'font-danger' : 'font-default'}>
					{used} / {total}
				</Box>
				<Box fontScale='p2' color='font-secondary-info' mbs={12}>
					{available} {t('ActiveSessions_available')}
				</Box>
			</Box>
		</FeatureUsageCard>
	);
};

export default ActiveSessionsCard;
