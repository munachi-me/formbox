import Link from 'next/link'

export type crumb = {
	name: string;
	href: string;
}

export function Crumbs({crumbs}: crumb[]){
	return(
		<div className="text-gray-700 text-[10px] pb-4 w-full flex flew-wrap items-center gap-1 font-family-mono">
			{crumbs.map((c, i) => (
				<div key={i} className="flex gap-1 items-center">
					{i > 0 && '/'}
					<Link href={c.href} key={i}
					className="font-medium uppercase tracking-[0.14em] text-green-light hover:underline"
					>
						{c.name}
					</Link>			
				</div>
			))}
		</div>
	)
}