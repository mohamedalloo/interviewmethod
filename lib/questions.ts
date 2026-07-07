export type RoleQuestion = {
  q: string;
  testing: string;
  weak: string;
  strong: string;
};

export type Role = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  pitch: string;
  questions: RoleQuestion[];
};

export const ROLES: Role[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    metaTitle: "Software Engineer Interview Questions — with brutally honest answer feedback",
    metaDescription:
      "The behavioral and verbal-technical questions software engineers actually get, what the interviewer is really testing, and the difference between a weak and a strong answer.",
    pitch:
      "Engineering interviews aren't lost on algorithms as often as you think — they're lost in the behavioral round, where strong builders give vague, we-heavy answers about their best work. Here's what interviewers are actually listening for.",
    questions: [
      {
        q: "Walk me through the most technically challenging project you've worked on.",
        testing:
          "Whether you personally drove the hard part or stood near it. Interviewers listen for the specific decision you made, the alternative you rejected, and whether you can explain the difficulty to a smart outsider.",
        weak: "A tour of the whole system with 'we' in every sentence — 'we migrated the platform, it was really complex.' Complexity is asserted, never demonstrated. The interviewer leaves unable to say what you did.",
        strong:
          "One project, one hard problem, your call: 'The consumer of that queue couldn't keep up at 40k events/sec. I profiled it, found serialization was 60% of CPU, and made the contested call to switch encodings — cut p99 latency from 900ms to 120ms. My tradeoff was breaking two internal consumers, which I migrated first.'",
      },
      {
        q: "Tell me about a time you disagreed with a technical decision.",
        testing:
          "Judgment plus spine. Do you push back with evidence, escalate proportionally, and commit cleanly when overruled — or do you either fold instantly or grind axes?",
        weak: "'I raised my concerns in the meeting but went along with the team decision.' That's compliance, not a story — the interviewer learns nothing about your judgment or your ability to influence.",
        strong:
          "Evidence, escalation, outcome, grace: 'I disagreed with adopting X because our write pattern would hit its known lock contention. I benchmarked both options in a day and presented numbers. We went with X anyway for hiring reasons — a fair call — and I wrote the mitigation layer. Six months later the contention showed up and the mitigation held.'",
      },
      {
        q: "Describe a production incident you caused or owned. What happened?",
        testing:
          "Honesty under pressure and whether your postmortem instinct is systems-level ('what made this possible') or cosmetic ('I'll be more careful').",
        weak: "A minor, victimless incident chosen for safety — 'I once pushed a config typo, we caught it fast.' Interviewers read a too-clean failure story as either low ownership or low candor.",
        strong:
          "Real stakes, your name on it, systemic fix: 'My migration locked the orders table for 9 minutes during peak — roughly $30k of failed checkouts. I rolled back, wrote the incident doc naming my own gap (no lock-time estimate in review), and added migration dry-runs to CI. The next 40 migrations shipped with predicted lock times.'",
      },
      {
        q: "How do you decide when code is good enough to ship?",
        testing:
          "Engineering maturity: whether you reason in tradeoffs (risk, reversibility, blast radius) or recite ideals (100% coverage, perfect abstractions) you don't actually practice.",
        weak: "'I always make sure it's fully tested and clean before shipping.' Nobody always does this, and the interviewer knows it — the answer reads as either naive or untruthful.",
        strong:
          "A real framework with a real example: 'Depends on reversibility. A feature behind a flag ships at 80% confidence because rollback is one click. A schema migration ships at 99% because it isn't. Last month I shipped a rough-but-flagged recommendation tweak in two days, then spent a week hardening the billing path nobody would ever see.'",
      },
      {
        q: "Why are you leaving your current role?",
        testing:
          "Whether you'll say something unguarded about a past employer (you'd do it about them too), and whether your move is toward something specific or just away from something vague.",
        weak: "'Looking for new challenges and growth opportunities' — the answer that could be photocopied onto any application. Or worse, ten seconds of manager-bashing that transfers all the blame outward.",
        strong:
          "Toward, not away, with proof you mean it: 'I've spent three years scaling one service and I'm at the point where I maintain more than I build. This role owns a system that's about to go through the exact growth phase I find hardest and most interesting — that's the work I want the next three years to be.'",
      },
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    metaTitle: "Product Manager Interview Questions — what hiring managers actually score",
    metaDescription:
      "Real PM interview questions with the hiring manager's private read: what each question tests, the weak answer they hear all day, and what a strong answer sounds like.",
    pitch:
      "PM interviews are judgment auditions. Every question is secretly the same question: can you make a contested call with incomplete data and carry people with you? Most candidates answer with process vocabulary instead.",
    questions: [
      {
        q: "Tell me about a product decision you got wrong.",
        testing:
          "Whether your relationship with being wrong is fast and curious or slow and defensive. PMs who can't produce a real wrong call at speed are telling the interviewer they don't keep score of their own decisions.",
        weak: "'We launched a feature that didn't perform as well as we hoped' — passive voice, shared blame, no decision named, no lesson that would change anything. The safest possible non-answer.",
        strong:
          "'I killed our annual-plan discount because the model said monthly LTV was higher. Churn spiked 4 points in a quarter — the model missed that annual users referred 2x more. I reversed it in six weeks, and now any pricing change I make has a pre-registered rollback trigger. That instinct has saved me twice since.'",
      },
      {
        q: "How did you decide what to build last quarter?",
        testing:
          "Whether prioritization at your company is something you drive or something that happens to you. Frameworks are fine; interviewers listen for the moment you overrode one with judgment.",
        weak: "'We use RICE scoring and align with leadership OKRs.' Process description, zero decisions. The interviewer has now learned your company has meetings.",
        strong:
          "One contested call, quantified: 'The scoring said build the enterprise SSO everyone asked for. I bumped a “smaller” onboarding fix above it because sales calls showed we were losing deals before SSO ever came up — activation was the real gate. Onboarding fix moved trial-to-paid 18%; SSO shipped a quarter later and closed the deals it needed to.'",
      },
      {
        q: "Tell me about a time engineering pushed back hard on your plan.",
        testing:
          "Influence without authority — the entire job. Do you negotiate on substance, or do you either steamroll (deadline pressure) or capitulate (scope collapse)?",
        weak: "'We compromised and found a middle ground.' Middle ground between what and what? No positions, no tension, no resolution mechanics — the story dissolves into pleasantness.",
        strong:
          "'Engineering said the personalization system was a two-quarter build; we had six weeks of runway to prove the concept. I cut the spec to a hardcoded rules table for our top 20 accounts — no ML, no infra. Ugly, shipped in three weeks, moved retention enough to fund the real build. The eng lead now pitches that stunt version to other teams.'",
      },
      {
        q: "What's a product you think is badly designed, and how would you fix it?",
        testing:
          "Taste plus rigor. Anyone can complain; interviewers want to see you diagnose the constraint that probably produced the bad design before you propose the fix.",
        weak: "A hot take with no empathy for constraints: 'Airline apps are terrible, I'd redesign the whole booking flow.' Redesigning everything is the same as prioritizing nothing.",
        strong:
          "Diagnose, respect the constraint, then one wedge: 'Pharmacy refill flows bury the one action 80% of users came for. My guess is compliance review makes every screen additive-only. I'd fight for exactly one change — a refill button on the home screen gated by a single auth — and I'd measure calls to the pharmacy line as the success metric, because that's the cost center that funds the work.'",
      },
      {
        q: "Why product management, and why here?",
        testing:
          "Whether 'here' could be swapped for any other company without editing your answer. Generic motivation predicts generic work.",
        weak: "'I love solving customer problems and your mission really resonates with me.' Swap in any company name; the sentence still compiles. That's the test, and it fails.",
        strong:
          "Specific tension only this company has: 'You're the only player selling to both the clinic and the patient, which means every roadmap decision is a two-sided pricing problem — that's the class of problem I've spent four years on in marketplaces, and I want to do it where the stakes are health outcomes instead of delivery fees.'",
      },
    ],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    metaTitle: "Data Analyst Interview Questions — with the answers interviewers actually want",
    metaDescription:
      "Behavioral and case questions for data analyst interviews: what's really being tested, the weak answers hiring managers hear constantly, and strong rewrites.",
    pitch:
      "Analyst interviews test one thing above SQL: whether your numbers change decisions. Candidates who narrate dashboards lose to candidates who narrate arguments they won with data.",
    questions: [
      {
        q: "Tell me about an analysis that changed a decision.",
        testing:
          "Whether your work product is 'insights' (decorative) or decisions (load-bearing). The interviewer wants the before-state, your analysis, and the after-state — with a named decision in between.",
        weak: "'I built a churn dashboard that gave leadership visibility into retention trends.' Visibility is not a decision. Dashboards that inform nothing specific are the analyst equivalent of 'we improved things.'",
        strong:
          "'Marketing was about to double spend on the channel with the best CAC. I rebuilt attribution with a 90-day window and showed that channel was harvesting demand the podcast ads created — its true CAC was 3x reported. They moved $400k to podcasts instead, and blended CAC fell 22% over two quarters.'",
      },
      {
        q: "Walk me through a time your analysis was wrong.",
        testing:
          "Intellectual honesty and whether you have error-catching machinery (sanity checks, base rates, replication) or just vibes and confidence.",
        weak: "'The data was incomplete so the results were off' — blaming the dataset. Interviewers hear: this person's errors will always be someone else's fault, which means they'll repeat.",
        strong:
          "'I reported a 15% conversion lift that was actually a tracking change — I hadn't checked whether the event definition shifted mid-experiment. A PM caught it after we'd celebrated. Now the first tab of every analysis I ship is a data-integrity check: event definitions, volume anomalies, before/after schema diffs. It's caught three landmines since.'",
      },
      {
        q: "A metric dropped 20% overnight. What do you do?",
        testing:
          "Diagnostic order of operations. Strong analysts check instrumentation before reality, segment before theorizing, and communicate before finishing.",
        weak: "Jumping straight to business hypotheses: 'Maybe a competitor launched something, or seasonality...' Theorizing about the market before ruling out a broken tracking pixel is the classic junior tell.",
        strong:
          "Instrument → segment → communicate: 'First, is it real — did tracking, definitions, or a release change? Then segment: one platform, one geo, one user cohort, or everywhere? A uniform drop is usually measurement; a concentrated one is usually real. Within the hour I'd tell stakeholders what I've ruled out, not wait until I have the answer.'",
      },
      {
        q: "How do you handle a stakeholder who wants the data to say something it doesn't?",
        testing:
          "Backbone with tact. Can you protect the integrity of the number while keeping the relationship — or do you either cave or make it a righteousness contest?",
        weak: "'I just show them the data — numbers don't lie.' Numbers get argued with all day. This answer signals you've never actually been in the room when it happened.",
        strong:
          "'A VP wanted the launch called a win; the lift was noise. I didn't argue the topline — I reframed what would make it a win: “at current trend we'd need 6 more weeks to hit significance; here are the two segments where it IS working.” He got a true story he could tell upward, and I didn't sign my name to a false one.'",
      },
      {
        q: "Why do you want this role instead of a data science or engineering position?",
        testing:
          "Whether analyst is a choice or a waiting room. Teams get burned by hires who treat the role as a stepstool and leave in a year.",
        weak: "'I see it as a great stepping stone toward data science.' Honest, maybe — but you've just told the hiring manager their opening is your layover.",
        strong:
          "'The part of the pipeline I want to own is the last mile — where a model or a metric becomes an argument that changes what the company does Monday morning. That's the analyst seat. I'd rather be the person in the decision meeting than the person whose feature pipeline feeds it.'",
      },
    ],
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    metaTitle: "Nursing Interview Questions — brutally honest prep for RN interviews",
    metaDescription:
      "The questions nurse managers actually ask in RN interviews — patient safety scenarios, conflict, prioritization — with weak vs strong answer breakdowns.",
    pitch:
      "Nursing interviews are scenario interviews: the manager is simulating a shift with you in it. They already assume you're clinically competent — they're testing whether you escalate correctly, chart honestly, and hold up when the floor is on fire.",
    questions: [
      {
        q: "Tell me about a time you caught a potential patient safety issue.",
        testing:
          "Your assessment instinct and whether you act inside the chain of command at the right speed. Managers listen for what you noticed, how fast, and who you told.",
        weak: "'I always double-check medications and follow the five rights.' Protocol recitation instead of a story. Every candidate says this; it proves training, not judgment.",
        strong:
          "One catch, with the clock running: 'Post-op patient's pressure was technically in range but trending down each hour, and he'd gotten quieter. Gut said bleed. I called the rapid assessment before he met any protocol threshold — hemoglobin had dropped three points. Surgeon told me the early call is why he went back to the OR stable instead of coding.'",
      },
      {
        q: "Describe a conflict with a physician or provider. How did you handle it?",
        testing:
          "Whether you'll advocate for a patient against a power gradient — using SBAR and escalation paths, not either silence or a hallway confrontation.",
        weak: "'I believe in respectful communication and we worked it out professionally.' Nothing happened in this story. The manager needs to know you'll speak up when it's uncomfortable, and this proves you won't say anything uncomfortable even in an interview.",
        strong:
          "'A resident ordered a dose that was high for the patient's renal function. He dismissed my first flag. I said, “I'm not comfortable giving this — I'd like us to check with pharmacy together,” which kept it collaborative but immovable. Pharmacy adjusted the dose. I charted the exchange factually. He started asking my read on his orders after that.'",
      },
      {
        q: "You have four patients and three call lights going off. Walk me through your next ten minutes.",
        testing:
          "Prioritization under load — airway/safety first, delegation second, communication third. They want to hear your triage logic out loud, not 'I stay calm.'",
        weak: "'I stay calm under pressure and multitask well.' The question was a simulation; this answer refuses to run it. Managers score it as a non-answer.",
        strong:
          "Triage out loud: 'Ten seconds per light to classify: anything airway, chest pain, fall risk, or post-op bleeding jumps the line. My confused fall-risk patient's light beats the water request even though the water request came first. I delegate what's delegable to my aide by name with a specific task, tell the third light “I see you, I'll be there in five minutes” — acknowledged patients wait safely, ignored ones climb out of bed.'",
      },
      {
        q: "Tell me about a medication error or near-miss you were involved in.",
        testing:
          "Candor and safety culture. A nurse who claims a spotless record is either brand new or unsafe to work with, because errors that aren't reported get repeated.",
        weak: "'I've never made a medication error — I'm extremely careful.' The single most disqualifying answer in nursing interviews. It tells the manager you either don't recognize your near-misses or don't report them.",
        strong:
          "'I hung the right drug at the wrong rate — caught it forty minutes in during my own recheck. Patient was fine. I reported it that shift, told the family, and filed the near-miss. The pump defaults for that drug were part of the problem and got changed unit-wide. I'd rather be the nurse with a reported near-miss than the one whose errors are undiscovered.'",
      },
      {
        q: "Why this unit, and how long do you actually plan to stay?",
        testing:
          "Turnover math. Training you costs the unit months of preceptor time; the manager is estimating whether you'll leave for travel nursing or the ICU the moment you're useful.",
        weak: "'I'm passionate about patient care and looking for a supportive team environment.' Says nothing about this unit; reads as a mass-applied answer from someone already planning their next move.",
        strong:
          "Name the unit's reality: 'I want med-surg deliberately — the volume and variety is where assessment skills get sharp, and your unit's ratios and preceptor program are why I chose here over the bigger system across town. I'm not pretending it's forever, but I'm committing to the two-plus years it takes to be a nurse others can lean on, and I'd rather grow into charge here than restart elsewhere.'",
      },
    ],
  },
  {
    slug: "sales-account-executive",
    title: "Sales / Account Executive",
    metaTitle: "Sales & AE Interview Questions — what sales leaders actually listen for",
    metaDescription:
      "Account executive and SDR interview questions with the sales manager's real scorecard: numbers, deal autopsies, and the mock-pitch moment most candidates fumble.",
    pitch:
      "Sales interviews are the one place where the interview IS the job audition: they're watching you discover, handle objections, and close — on them. Candidates who can't quantify their own pipeline are telling on themselves.",
    questions: [
      {
        q: "Walk me through your numbers for the last four quarters.",
        testing:
          "Whether you know your own business cold: quota, attainment, ACV, cycle length, win rate, pipeline coverage. Hesitation here reads as either weak performance or weak ownership.",
        weak: "'I consistently hit or exceeded my targets.' No numbers means no credibility — every sales leader translates this to 'missed quota, hoping you won't ask.'",
        strong:
          "Instant, specific, honest about the miss: '104%, 89%, 121%, 98% against a $900k annual number, average deal $42k, 71-day cycle. The 89% quarter was two slipped enterprise deals — both closed the next quarter, which is why Q3 was 121%. Since then I forecast enterprise at 50% weighting no matter what the champion tells me.'",
      },
      {
        q: "Tell me about the biggest deal you lost. What happened?",
        testing:
          "Deal-autopsy honesty. Losers blame procurement, budget, timing. Sellers who advance name the moment they lost control of the deal.",
        weak: "'We lost on price — their budget got cut and the competitor undercut us.' Externalized loss with zero self-examination. The manager hears a rep who will bring them excuses instead of forecasts.",
        strong:
          "'$280k deal, lost to the incumbent. The real cause: I single-threaded on a champion who loved us but couldn't sign. When she went on leave in month four, I had no relationship above her. Now I don't move a deal to proposal stage until I've had a business conversation with economic buyer — I've walked from deals over it, and my win rate went up.'",
      },
      {
        q: "Sell me this product. (Or: pitch me what you sell now.)",
        testing:
          "Whether you pitch or discover. Weak reps launch into features; strong reps ask two questions before saying anything about the product — because that's what they do in real calls.",
        weak: "Launching straight into a feature monologue with enthusiasm as the strategy. The interviewer wanted to be asked about their problem; instead they got a brochure read aloud.",
        strong:
          "Discovery first, always: 'Before I pitch — when your team evaluates tools like this, what breaks today? How are you handling it now, and what does it cost when it fails?' Then a pitch built only from their answers, ending with a real close: 'If I could show that fix in 20 minutes Thursday, would you take the meeting?'",
      },
      {
        q: "How do you handle the first 30 days of a new territory or book?",
        testing:
          "Whether you have an operating system or wait for leads. Managers are hiring your first quarter — they want to hear it planned before you've been hired.",
        weak: "'I'd focus on learning the product and building relationships.' Four weeks of studying is four weeks of no pipeline. This answer forecasts a slow ramp and asks the manager to pay for it.",
        strong:
          "Pipeline math from day one: 'Week one: rank the book — renewal dates, usage signals, whitespace. Weeks one to four in parallel: 30 discovery calls into the top segment while I learn the product by demoing it badly and fixing it. My target is a full pipeline-coverage ratio by day 45, because at a 71-day cycle anything I don't start in month one is a Q2 miss.'",
      },
      {
        q: "Why did you leave (or why are you leaving) your last sales role?",
        testing:
          "Pattern detection. Sales leaders see serial 11-month stints and comp-plan complaints as leading indicators; they're checking whether you run toward markets or away from accountability.",
        weak: "'The comp plan changed and territory got cut — it wasn't fair to the reps.' Even when true, leading with it signals that your performance narrative depends on conditions being right.",
        strong:
          "Own the record, then the reason: 'I finished at 98% lifetime attainment there and I'd sell that product again. I'm leaving because the motion turned entirely inbound-renewal, and the muscle I want to be elite at is competitive new-logo hunting — which is 80% of this role. That's the honest trade: I'm giving up comfort for the part of the job I'm best at.'",
      },
    ],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    metaTitle: "Marketing Manager Interview Questions — the answers that survive scrutiny",
    metaDescription:
      "Marketing interview questions with the hiring manager's lens: attribution honesty, failed campaigns, budget defense, and what strong answers sound like.",
    pitch:
      "Marketing interviews have one recurring trap: claiming credit for numbers you can't defend under two follow-up questions. Interviewers push on attribution precisely because most candidates' metrics collapse when touched.",
    questions: [
      {
        q: "Tell me about your best-performing campaign. How do you know it worked?",
        testing:
          "Attribution honesty. The first number you give will get the follow-up 'how did you measure that?' — the answer's quality lives or dies there.",
        weak: "'Our brand campaign drove a 40% increase in engagement.' Engagement is the metric people cite when revenue didn't move. The follow-up question will find this out in one step.",
        strong:
          "Claim sized to the evidence: 'The retargeting sequence drove $310k in influenced pipeline — and I'll be straight about attribution: last-touch overstates it, so I ran a geo holdout on 20% of the audience. Held-out regions converted 31% worse. That's the number I actually defend: roughly $200k incremental, at a 4:1 return.'",
      },
      {
        q: "Tell me about a campaign that flopped.",
        testing:
          "Whether you diagnose failures to a mechanism (wrong audience, wrong offer, wrong moment) or to fate ('it just didn't resonate'). Mechanism-thinkers improve; fate-thinkers repeat.",
        weak: "'We tried podcast ads but they didn't really convert for us.' No spend figure, no hypothesis, no autopsy — just a channel blamed and abandoned. This is how budgets get wasted twice.",
        strong:
          "'I spent $60k on a webinar series that produced 9 SQLs — brutal. The autopsy: the topic attracted practitioners, but our buyer is their VP; we generated an audience that loved us and couldn't buy. I resold the same content as a 2-page executive brief pushed via ABM to the VPs — same material, right altitude, 40+ SQLs over two quarters.'",
      },
      {
        q: "Your CEO wants to cut your budget 30%. Defend it — or don't.",
        testing:
          "Whether you think like an owner (some of the budget SHOULD be cut) or a defender (all spend is sacred). The counterintuitive strong move is conceding the weak 30% yourself.",
        weak: "'I'd show the ROI data for each channel to justify the current budget.' Pure defense signals you've never ranked your own spend honestly — and the CEO already suspects there's fat.",
        strong:
          "'Honestly, I can find the first 15% myself — bottom-quartile spend exists in every budget I've run and I'd rather name it than defend it. Then the real conversation: the next 15% comes out of pipeline in two quarters, not this one, so here's the specific bookings number I'd ask the CEO to sign off on losing. Cuts should be a trade both sides see.'",
      },
      {
        q: "How do you work with sales when they say your leads are garbage?",
        testing:
          "Whether you treat the sales-marketing war as a data problem or a diplomacy problem. Strong answers include a definition change, not just 'better communication.'",
        weak: "'I set up regular syncs between sales and marketing to improve alignment.' Meetings are where this problem is discussed, not where it's solved. No mechanism, no answer.",
        strong:
          "'They were right — 60% of our MQLs were content downloaders with no buying signal. I sat in on 20 discovery calls, then rebuilt the qualification threshold around the two behaviors that actually predicted opportunity creation. Volume dropped 40%, and sales acceptance went from 31% to 78%. Now the SLA runs both directions: they touch every lead in 24 hours, or it comes back to my nurture.'",
      },
      {
        q: "Why marketing here, given our product is (frankly) hard to differentiate?",
        testing:
          "Strategic honesty. The interviewer just handed you a real weakness — do you flatter it away or engage with it like the actual job?",
        weak: "'I actually think your product is really differentiated!' Contradicting the hiring manager's own framing to flatter them. Now they know you'll do it in the job, too.",
        strong:
          "Take the premise seriously: 'Agreed — feature-level parity is real in your category, which is exactly why the marketing seat matters more here than at a product-led company. Parity markets are won on segment focus and distribution, not claims. The interesting move I'd want to test: own one vertical's workflow completely instead of being the eighth generalist tool.'",
      },
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    metaTitle: "Project Manager Interview Questions — beyond the certification answers",
    metaDescription:
      "PM interview questions with what interviewers actually score: bad-news delivery, scope defense, stakeholder conflict — weak vs strong answers.",
    pitch:
      "Project management interviews filter for one scarce trait: people who deliver bad news early and specifically. Every scenario question is secretly probing whether you'll surface the slip in week 2 or confess it in week 9.",
    questions: [
      {
        q: "Tell me about a project that went off the rails. When did you know, and who did you tell?",
        testing:
          "The gap between when you knew and when you escalated — that gap is your integrity under pressure, and interviewers probe for it specifically.",
        weak: "'We faced some delays due to shifting requirements but ultimately delivered.' The words 'ultimately delivered' are doing cover-up work here — the interviewer wants the crisis, and you've edited it out.",
        strong:
          "'In week three of a twelve-week rollout, integration testing showed the vendor API couldn't handle our volume. I told the sponsor that same week — with three options costed: slip four weeks, cut the two integrations causing it, or add $80k of middleware. They picked the cut. Delivering that news early is why the project is remembered as a success instead of a surprise.'",
      },
      {
        q: "A key stakeholder keeps adding scope. Walk me through your actual conversation with them.",
        testing:
          "Whether you have words for the moment, not just a process. 'I'd refer to the change control process' dodges the human confrontation the question is about.",
        weak: "'I'd document the request and run it through change control.' Process as a shield. The stakeholder outranks your change log — the interviewer wants to hear you say the hard sentence out loud.",
        strong:
          "The actual sentence: 'I say: “Yes, and here's the price.” Every addition gets costed against the triangle in the same meeting — “we can add the audit trail; it moves launch two weeks or drops the bulk-import. Which do you want?” Making them choose converts scope creep into their decision instead of my problem. One VP started prefacing requests with “I know, I know, what does it cost me.”'",
      },
      {
        q: "How do you run a project when you have zero authority over the team?",
        testing:
          "The core PM condition. They're listening for influence mechanics — public commitments, making status visible, borrowing authority deliberately — not charisma claims.",
        weak: "'I build strong relationships and lead by influence.' The question asked HOW. This is the title of the answer, submitted in place of the answer.",
        strong:
          "Mechanics, plural: 'Three levers. Public micro-commitments — people honor dates they said out loud in front of peers far more than dates I assigned. A status page so visible that being the red row is its own pressure. And borrowed authority used sparingly: I spend a sponsor escalation maybe once a quarter, because the threat of it works only while it's rare.'",
      },
      {
        q: "Two teams on your project blame each other for a slip. What do you do first?",
        testing:
          "Whether you chase the interpersonal noise or reconstruct the factual sequence. Strong PMs de-personalize by timeline before mediating anything.",
        weak: "'I'd bring both teams together to talk it through and find common ground.' A blame meeting with no facts prepared becomes a bigger blame meeting. Order of operations is the whole test.",
        strong:
          "'Facts before feelings: I reconstruct the timeline myself first — commits, handoff dates, the actual dependency chain. Nine times out of ten the real cause is an interface neither team owns, which turns the meeting from arbitration into repair: “the gap is the handoff spec; who owns it going forward?” Nobody has to lose for the project to win.'",
      },
      {
        q: "What's your least favorite part of project management?",
        testing:
          "Self-awareness plus honesty calibration. 'I love all of it' is disqualifying; naming something core to the job is too. The skill is an honest answer about a real cost you've decided to pay.",
        weak: "'Honestly, I love the variety — every day is different!' Non-answers to honesty-probes get scored as evasive, which is worse than any actual weakness you could have named.",
        strong:
          "Honest, non-core, managed: 'The status-theater layer — decks about work instead of work. I've made peace with it by getting ruthless about format: one page, three colors, same structure every week, so reporting costs my team 30 minutes instead of a day. I'll never love it, but my sponsors always know exactly where we are, and that trust buys my team autonomy.'",
      },
    ],
  },
  {
    slug: "teacher",
    title: "Teacher",
    metaTitle: "Teacher Interview Questions — honest prep for teaching interviews",
    metaDescription:
      "The questions principals actually ask in teaching interviews — classroom management, difficult parents, differentiation — with weak vs strong answer breakdowns.",
    pitch:
      "Principals interview for the classroom moments that break first-year teachers: the defiant student with an audience, the angry parent email, the lesson that flopped by 9:15am. Philosophy answers lose to specific-moment answers every time.",
    questions: [
      {
        q: "A student refuses to work and is disrupting the class — and the other students are watching. What do you do in the moment?",
        testing:
          "De-escalation under an audience. Principals know power struggles performed in front of a class are unwinnable; they're listening for how you defer the confrontation without losing the room.",
        weak: "'I believe in building relationships so those situations rarely happen.' Prevention philosophy in response to an in-the-moment question. The principal needs to know you can land the plane, not that you avoid weather.",
        strong:
          "The moment, choreographed: 'Low voice, close distance, private choice: “You can start the first two problems or we can talk at my desk — your call, I'll come back in one minute.” Then I walk away and teach, because walking away removes the audience that's fueling it. The follow-up happens after class, where the real conversation is possible. The class sees calm; the student gets an exit ramp.'",
      },
      {
        q: "Tell me about a lesson that bombed. What did you do at 9:15 when it was clearly failing?",
        testing:
          "Real-time adaptability and honesty. Every teacher has bombed a lesson; candidates who can't produce one are hiding, and candidates who 'pushed through' worry principals more.",
        weak: "'I always reflect after lessons and adjust for next time.' The question asked about DURING. Reflection-after is table stakes; the principal wants to know the kids didn't lose the hour.",
        strong:
          "'My fraction stations assumed they could self-direct; by 9:15 three stations were chaos. I called it — full stop, everyone to the carpet, and we did the one station that worked as a whole class with me modeling. Salvaged the objective for most of them. The redesign the next day added a 4-minute routine for station transitions, which was the actual missing skill.'",
      },
      {
        q: "A parent emails that you're grading their child unfairly and CCs the principal. Walk me through your response.",
        testing:
          "Professional composure and whether you know the sequence: acknowledge fast, meet with evidence, keep the principal informed — never litigate grades over email.",
        weak: "'I'd explain my grading policy to the parent.' Policy-quoting to an angry parent escalates; and this answer ignores the CC'd principal, which is the political half of the test.",
        strong:
          "'Same-day reply, three sentences: thank them, offer a meeting, no defense of the grade in writing. I loop the principal before the meeting — “here's the situation and the work samples I'll walk through” — so they're never surprised. In the meeting I put the rubric next to the student's work and a proficient exemplar. Most grade disputes end when parents see the comparison; the ones that don't, end because the principal already trusts my process.'",
      },
      {
        q: "You have readers three grades apart in the same class. What does differentiation actually look like in your room on a Tuesday?",
        testing:
          "Whether differentiation is a lived practice or an interview vocabulary word. 'On a Tuesday' is the trap — they want logistics, not theory.",
        weak: "'I differentiate instruction to meet every learner where they are.' The question pre-blocked this answer by asking for a Tuesday. Restating the concept means there is no Tuesday.",
        strong:
          "Logistics, named: 'Same text, three access points: the core group reads independently with annotation prompts, my striving readers get the same passage chunked with an audio option, my advanced group gets an extension question that forces them back into the text for evidence. I'm at the striving table Tuesday because that's their heavy-support day — the schedule of WHERE I SIT is the differentiation plan most people never make.'",
      },
      {
        q: "Why did you leave your last school? (Or: why are you leaving?)",
        testing:
          "Discretion. Principals assume whatever you say about your last school, you'll someday say about theirs — and teaching is a small world where they may know your admin.",
        weak: "Ten seconds of honest venting about admin, class sizes, or parent culture. All possibly true; all disqualifying. The principal is now imagining your exit interview about them.",
        strong:
          "True and clean, pointed forward: 'I taught four good years there and I'd say so to anyone. I'm moving because I want to be at a school where vertical teaming is real — my growth area is seeing where my grade's instruction lands two years later, and your PLC structure is built for exactly that. I'm choosing toward something.'",
      },
    ],
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    metaTitle: "Customer Success Manager Interview Questions — with real answer standards",
    metaDescription:
      "CSM interview questions on churn saves, renewals, and difficult customers — what's really being tested and what strong answers sound like.",
    pitch:
      "CSM interviews probe one boundary constantly: are you the customer's friend or the revenue's guardian? Candidates who can't hold both — advocate hard AND defend the renewal — get sorted into 'support rep' instead of 'hire.'",
    questions: [
      {
        q: "Tell me about a churn you saved. What actually turned it around?",
        testing:
          "Whether your saves come from a diagnosis and a play, or from discounting and hoping. 'We gave them three free months' is a delay, not a save — and interviewers know the difference.",
        weak: "'I rebuilt the relationship through regular check-ins and they ended up staying.' Check-ins are weather, not causation. What was broken, what did you change, why did it work?",
        strong:
          "'Their exec sponsor left; usage fell 60% in a quarter — classic silent churn. The diagnosis: nobody remaining could connect our product to a business number. I built a one-page value recap tied to THEIR board metric, got 30 minutes with the new VP, and re-onboarded her team against her goals, not our features. Renewed flat with no discount — and expanded two quarters later.'",
      },
      {
        q: "A customer demands a feature that isn't on the roadmap and threatens to leave. What do you tell them?",
        testing:
          "Honesty under revenue pressure. Do you make soft promises to survive the call (creating a worse call in six months), or can you say no while keeping the account?",
        weak: "'I'd escalate it to product and let the customer know we're advocating for them.' Translation: a soft yes that product will have to break later. Interviewers hear a CSM who exports their conflict to other teams.",
        strong:
          "'I never buy quarters with implied promises — that bill always comes due. I say: “It's not on the roadmap and I won't pretend otherwise. Let's separate the request from the problem — what does the absence of this cost you today?” Two-thirds of the time there's a workaround that clears 80% of it. For the rest, I bring product the business case with a number attached — and the customer sees the honest process, which keeps trust even when the answer stays no.'",
      },
      {
        q: "How do you run a renewal conversation when usage is down and you know it?",
        testing:
          "Whether you raise the elephant first or hope they don't check the dashboard. Strong CSMs start the renewal 120 days out precisely so this conversation isn't happening at the deadline.",
        weak: "'I'd highlight the value they've received and the roadmap ahead.' Selling past the problem. If the customer mentions the usage drop before you do, you've lost the trust and probably the renewal.",
        strong:
          "'I open with it: “Your usage is down 40% and I'd be insulting you to pretend otherwise — here's what I think happened, tell me where I'm wrong.” Then the honest fork: fix-it plan with dates, or right-size the contract. I've shrunk contracts on purpose — a $30k customer who trusts you becomes $80k; a $60k customer who feels trapped becomes a competitor's case study.'",
      },
      {
        q: "Walk me through how you'd run your first 90 days with a book of 40 accounts you've never met.",
        testing:
          "Triage instinct. Meeting all 40 equally is the trap answer — they want risk-ranked sequencing with a reason for the ranking.",
        weak: "'I'd schedule introduction calls with all my accounts to build relationships.' Forty coffee chats while the three accounts that are actually on fire burn down. Equal attention is a strategy for losing the ones that matter.",
        strong:
          "'Rank before reaching out: renewal date within 6 months + usage trend + support ticket sentiment gives me a red/yellow/green in week one. Reds get a call in the first two weeks with their history already read — nothing kills credibility like asking a frustrated customer to “tell me about your goals.” Greens get a useful artifact, not a meeting: a benchmark or QBR-ready deck that makes ME worth answering next time.'",
      },
      {
        q: "What's the difference between customer success and customer support?",
        testing:
          "Whether you understand the commercial mandate of the role. It sounds like a softball; it's a filter for people who think CS is reactive niceness.",
        weak: "'Support is reactive, success is proactive.' Correct and useless — it's the first line of every blog post on the topic, and it doesn't mention revenue once.",
        strong:
          "Own the commercial edge: 'Support resolves tickets; success owns an outcome and a number. My job is that the customer hits the business result they bought us for — and that the renewal is a formality because the value conversation happened all year. If I'm doing it right, I'm the least surprised person in the building at renewal time. That includes being paid to have uncomfortable conversations support never has to have.'",
      },
    ],
  },
  {
    slug: "federal-to-private",
    title: "Federal → Private Sector",
    metaTitle: "Federal to Private Sector Interview Questions — translate your government experience",
    metaDescription:
      "Interview prep for federal employees moving to the private sector: how to translate government experience, handle the 'pace' question, and answer without the jargon.",
    pitch:
      "Hundreds of thousands of federal employees hit the private market in the last two years, and most walk into interviews carrying two handicaps: acronym-dense stories no civilian can follow, and an interviewer quietly wondering if they can handle the pace. Both are fixable — here's how the questions actually go.",
    questions: [
      {
        q: "Your background is government. Honestly — can you handle the pace here?",
        testing:
          "The bias behind the question is real; the test is whether you get defensive, over-concede, or produce evidence of speed from inside the bureaucracy — which is the strongest possible answer.",
        weak: "'Government isn't as slow as people think.' Arguing with the premise instead of producing evidence. You've spent your answer defending an institution instead of selling yourself.",
        strong:
          "Evidence of speed under constraint: 'Fair question. When the courts gave us 30 days to stand up a new intake process — statutory deadline, no extensions — I had it running in 26, across three offices, under procurement rules that make everything harder. I've delivered fast where fast was legally mandatory. What I'm looking forward to is doing that without the Federal Register in the loop.'",
      },
      {
        q: "Walk me through your biggest accomplishment — without any government jargon.",
        testing:
          "Translation ability. The interviewer is checking whether you can talk to customers, executives, and teammates who don't know what an IPA, COR, or PMF is — because that's every conversation in the new job.",
        weak: "'As the COR on a $12M IDIQ, I coordinated with the PMO to ensure FAR compliance across task orders.' Every acronym is a small door closing. The interviewer stopped following — and hiring — at 'COR.'",
        strong:
          "Same story, civilian language: 'I managed $12 million of outside vendors delivering our case-processing software. When the lead vendor started slipping, I restructured the contract into smaller milestone payments tied to working software — their delivery rate doubled in two quarters. Vendor management, performance incentives, budget authority: same skills, different letterhead.'",
      },
      {
        q: "Why are you leaving federal service? (Both of us know what's been happening.)",
        testing:
          "Composure about circumstances everyone understands. RIF'd candidates who lead with grievance — however justified — read as risky; the test is a clean, forward-facing two sentences.",
        weak: "A detailed, bitter account of the RIF, the politics, and what was done to your agency. Every word may be true; the interviewer is now worried about how you process adversity, which was the actual question.",
        strong:
          "Two clean sentences, then pivot: 'My agency went through the reductions you've read about — my position was eliminated along with most of my office. I'm proud of what I did there, and honestly, the forced move made me examine what I want: the mission-driven work, at a speed government couldn't give me. Your compliance platform is literally the private-sector version of what I enforced — I know your customer from the inside.'",
      },
      {
        q: "You managed a large team in government. Here, you'd start as an individual contributor. Really okay with that?",
        testing:
          "Title-drop tolerance. Ex-feds often step down a level moving over; interviewers probe whether resentment will surface in month six.",
        weak: "'Yes, absolutely, no problem at all!' — too fast, no reasoning. Unexamined enthusiasm about a demotion reads as either desperation or denial, both of which churn.",
        strong:
          "Reasoned trade, eyes open: 'I've thought about this specifically. What I actually loved was the analysis work — the team of 14 came with the grade, and half my week was personnel administration I won't miss. Two years of IC depth in your stack is the honest path to leading here credibly, and my supervision experience shows up anyway: I'll be the IC who makes your team lead's job easier.'",
      },
      {
        q: "What do you know about how we make money?",
        testing:
          "Whether you've done the commercial homework. Fair or not, the stereotype is that career civil servants don't think in revenue; sixty seconds of business-model fluency destroys it.",
        weak: "'You're a software company that sells compliance tools.' Product description, not a business model. The stereotype just survived the interview.",
        strong:
          "Business-model fluency: 'You sell per-seat SaaS to mid-market banks, but the filings say expansion revenue is the growth engine — land with the audit module, expand into monitoring. Which means renewals depend on the compliance officer proving value to their CFO... and I've BEEN the person your customers answer to. I can tell your product team exactly what that examiner needs to see.'",
      },
    ],
  },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
