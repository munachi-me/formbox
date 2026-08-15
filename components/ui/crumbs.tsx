import Link from 'next/link'

export type crumb = {
	name: string;
	href: string;
}

export function Crumbs({crumbs}: crumb[]){
	return(
		<div className="text-gray-700 text-xs">
			{crumbs.map((c, i) => (
				<>
					{i > 0 && ' / '}
					<Link href={c.href} key={i}
					className="text-xs font-medium uppercase tracking-[0.14em] text-purple-light hover:underline"
					>
						{c.name}
					</Link>			
				</>
			))}
		</div>
	)
}