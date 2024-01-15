import { withRouterHOC } from '@/app/providers/withRouterHOC'
import compose from 'compose-function'
export const withProviders = compose(withRouterHOC)
