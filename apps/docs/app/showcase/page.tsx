import { buttonVariants } from '@/components/ui/button'
import NextFAQImage from '@/public/showcases/next-faq.png'
import YeecordImage from '@/public/showcases/yeecord.png'
import { cn } from '@/utils/cn'
import { createMetadata } from '@/utils/metadata'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'

export const metadata = createMetadata({
  title: 'Showcase',
  description: 'Some cool websites using Next Docs',
  openGraph: {
    url: 'https://next-docs-zeta.vercel.app/showcase'
  }
})

export default function Showcase() {
  const showcases = [
    [
      NextFAQImage,
      'Next.js Discord Common Questions',
      'https://nextjs-discord-common-questions.joulev.dev'
    ],
    [YeecordImage, 'Yeecord Docs', 'https://yeecord.com']
  ] as const
  const maskImage = 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 70%)'

  return (
    <main>
      <div className="relative py-16 text-center">
        <div
          className="absolute inset-0 animate-in fade-in duration-1000 bg-gradient-to-r from-red-500/20 via-purple-500/50 to-blue-500/20 z-[-1]"
          style={{
            maskImage,
            WebkitMaskImage: maskImage
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, hsl(var(--primary)/.4) 1px,transparent 2px,transparent 40px), repeating-linear-gradient(to bottom, hsl(var(--primary)/.4),hsl(var(--primary)/.4) 1px,transparent 2px,transparent 40px)'
            }}
          />
        </div>
        <div className="container">
          <h1 className="font-semibold text-3xl mb-4 lg:text-4xl">Showcase</h1>
          <p className="text-muted-foreground">
            Some cool websites using Next Docs
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/fuma-nama/next-docs/discussions/30"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants())}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Your Own
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-12 container md:grid-cols-2 lg:grid-cols-3">
        {showcases.map(([image, name, href], key) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="relative border rounded-lg group overflow-hidden transition-all shadow-lg hover:shadow-primary/10 hover:border-primary/30"
          >
            <Image alt="Preview" src={image} placeholder="blur" />
            <p className="absolute inset-x-0 bottom-0 p-6 pt-8 mt-2 text-white text-sm font-medium bg-gradient-to-t from-black transition-all group-hover:[background-position-y:50px] bg-no-repeat">
              {name}
            </p>
          </a>
        ))}
      </div>
    </main>
  )
}
