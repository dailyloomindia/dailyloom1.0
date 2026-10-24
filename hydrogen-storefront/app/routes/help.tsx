// Help page: returns, care guide, contact.
import {useLoaderData} from '@remix-run/react';
import {useShell, type ShellLogic} from '~/dl/Shell';
import {HelpView} from '~/dl/views/HelpView';
import {CARE_GUIDE, HELP_RETURNS} from '~/dl/data/help.server';

export async function loader() {
  return {HELP_RETURNS, CARE_GUIDE};
}

function helpVals(sh: ShellLogic, HELP_RETURNS: any, CARE_GUIDE: any){
  return {
    isHelp: true, helpReturns: HELP_RETURNS.map(([k, v]: any) => ({k, v})),
    careGuide: CARE_GUIDE.map((g: any) => ({t:g.t, products:g.products, items:g.items.map(([a, b]: any) => ({t:a, b})), go: () => sh.goStory(g.cat)})),
  };
}

export default function Help() {
  const {HELP_RETURNS, CARE_GUIDE} = useLoaderData<typeof loader>();
  const {sh, base} = useShell();
  return <HelpView vals={{...base, ...helpVals(sh, HELP_RETURNS, CARE_GUIDE)}} />;
}
