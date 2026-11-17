import { DonatePage } from './Donate'

/* Bunono DONATE — the same one-page donation flow as Nalugala (gift type →
 * amount → cause → details → payment method → send, then FAQ), in Bunono's
 * storybook skin: cream paper, dashed crayon borders and doodles. */
export default function DonateBunono() {
  return <DonatePage variant="bunono" />
}
