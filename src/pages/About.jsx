import data from '../data.json'

function About() {
  const author = data.author

  return (
    <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-600">About the author</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Jamaluddin Jamali</h1>
        <p className="text-lg leading-8 text-slate-700">{author.bio}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Primary focus</p>
          <p className="mt-4 text-base leading-7 text-slate-700">Literary crossover fiction, suspense, and psychological thrillers rooted in South Asian life and human experience.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Career</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <li>Reporter at City News Network, City42, and 24News</li>
            <li>Previously at The Nation, The Post, and Pakistan Today</li>
            <li>Master's in English Literature</li>
            <li>Lives in Lahore with wife and four children</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
