import { formatTokenAmount } from '@lifinance/widget/utils/format';
import { BoxProps, Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SwapRouteCard } from '../../components/SwapRouteCard';
import { useSwapRoutes } from '../../hooks';
import { Stack } from './SwapRoutesPage.style';

export const SwapRoutesPage: React.FC<BoxProps> = ({ mb }) => {
  const { t } = useTranslation();
  const { routes, isFetching, isFetched } = useSwapRoutes();

  if (!routes?.length && !isFetched && !isFetching) {
    return null;
  }

  return (
    <Stack direction="column" spacing={2}>
      {!routes?.length && isFetching
        ? Array.from({ length: 3 }).map(() => (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={195}
              sx={{ borderRadius: 1 }}
            />
          ))
        : routes?.map((route, index) => (
            <SwapRouteCard
              amount={formatTokenAmount(route.toAmount, route.toToken.decimals)}
              token={route.toToken.name}
              gas={t(`swap.currency`, { value: route.gasCostUSD })}
              time={(
                route.steps
                  .map((step) => step.estimate.executionDuration)
                  .reduce((cumulated, x) => cumulated + x) / 60
              ).toFixed(0)}
              type="recommended"
              active={index === 0}
            />
          ))}
    </Stack>
  );
};