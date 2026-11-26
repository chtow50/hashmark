"""Head coach before/after builder. Offline: reads cached CFBD pulls in /workspace/cfbd-data/cache (0 API calls here)."""
import json, glob, re, collections, datetime
C='/workspace/cfbd-data/cache/'
coaches=json.load(open(C+'coaches__maxYear-2026_minYear-2005.json'))
units=json.load(open('/workspace/hashmark-review/coordinators/units.json'))['seasons']
fbs26=[t['school'] for t in json.load(open(C+'teams_fbs__year-2026.json'))]
slug={}
for y,s in units.items():
    for t in s['teams']: slug[t['team']]=t['slug']
missing=[t for t in fbs26 if t not in slug]; print('no slug',missing)
epa={}
for y,s in units.items():
    if y=='2026': continue
    for t in s['teams']:
        epa[(t['team'],int(y))]=dict(off=t['off_adj_ppa'],de=t['def_adj_ppa'],n=s['n_fbs'])
rec={}; 
for y in range(2005,2027):
    for r in json.load(open(C+f'recruiting_teams__year-{y}.json')): rec[(r['team'],y)]=(r['rank'],r['points'])
tal={}
for y in range(2015,2027):
    L=sorted(json.load(open(C+f'talent__year-{y}.json')),key=lambda r:-float(r['talent']))
    for i,r in enumerate(L):
        rk=i+1
        if i and float(r['talent'])==float(L[i-1]['talent']): rk=tal[(L[i-1]['team'],y)][0]
        tal[(r['team'],y)]=(rk,float(r['talent']),len(L))
# team-season table: official team totals from CFBD /records; coach games only used for share of season
ts=collections.defaultdict(lambda: dict(w=0,l=0,t=0,g=0,by={}))
for y in range(2005,2026):
    for r in json.load(open(C+f'records__year-{y}.json')):
        T=r['total']; e=ts[(r['team'],y)]; e['w']=T['wins'];e['l']=T['losses'];e['t']=T['ties'];e['g']=T['games']
def avg(xs):
    xs=[x for x in xs if x is not None]; return round(sum(xs)/len(xs),3) if xs else None
def wp(w,l,t): 
    g=w+l+t; return round((w+t/2)/g,3) if g else None
def window(school,years):
    W=L=T=0; rr=[];rp=[];tr=[];ne=[];of=[];de=[];ok=True
    for y in years:
        e=ts.get((school,y))
        if not e: return None
        if not e['g']: continue
        W+=e['w'];L+=e['l'];T+=e['t']
        r=rec.get((school,y)); rr.append(r[0] if r else None); rp.append(r[1] if r else None)
        t=tal.get((school,y)); tr.append(t[0] if t else None)
        p=epa.get((school,y))
        if p: ne.append(round(p['off']-p['de'],4)); of.append(p['off']); de.append(p['de'])
        else: ne.append(None); of.append(None); de.append(None)
    full=lambda xs: all(x is not None for x in xs)
    return dict(years=[years[0],years[-1]],w=W,l=L,t=T,winPct=wp(W,L,T),
        recRank=avg(rr) if full(rr) else None, recPts=avg(rp) if full(rp) else None,
        talentRank=avg(tr) if full(tr) else None, netEpa=avg(ne) if full(ne) else None,
        offEpa=avg(of) if full(of) else None, defEpa=avg(de) if full(de) else None)
out=[]; MINT=2; MAXN=3; LAST=2025
for school in fbs26:
    cur=[(c,s) for c in coaches for s in c['seasons'] if s['school']==school and s['year']==2026]
    c,s26=cur[0]; nm=(c['firstName']+' '+c['lastName']).strip()
    mine={s['year']:s for s in c['seasons'] if s['school']==school}
    yrs=sorted(mine)
    # contiguous run ending 2026
    run=[2026]
    while run[0]-1 in mine or (run[0]-1==2020 and ts.get((school,2020),{'g':1})['g']==0): run.insert(0,run[0]-1)
    notes=[]
    def share(y): e=ts.get((school,y)); return mine[y]['games']/e['g'] if e and e['g'] else 1
    first_in_data=run[0]
    pre2005 = first_in_data==2005 and (c['hireDate'] or '0')[:4]<'2005'
    full=[y for y in run if y<=LAST and share(y)>=0.75]
    trans=[y for y in run if y<=LAST and share(y)<0.75]
    # tenure seasons are those >= first full season
    S=None
    for y in run:
        if y<=LAST and share(y)>=0.75: S=y;break
    if S is None: S = 2026
    tenure=[y for y in run if S<=y<=LAST and ts.get((school,y),{'g':0})['g']>0]
    trans=[y for y in run if y<S]
    if pre2005: status='no-before'; notes.append('Hired before 2005 (hire date %s); CFBD seasons used here start in 2005, so there is no before window.'%(c['hireDate'] or '')[:10])
    N=min(MAXN,len(tenure))
    before=None
    if pre2005: pass
    elif len(tenure)<MINT:
        status='too-new'
    else:
        E=S-1-len([y for y in trans]) if False else None
        # before seasons end at last year with no games by him
        E=min(run[0],S)-1 if True else None
        E=(trans[0] if trans else S)-1
        while E==2020 and ts[(school,2020)]['g']==0: E-=1
        # matched N; shrink if program has fewer FBS seasons
        n=N
        while n>=MINT:
            before=window(school,list(range(E-n+1,E+1)))
            if before: break
            n-=1
        if before: N=n; status='compared'
        else: status='no-before'; notes.append('Fewer than two FBS seasons for %s before he was hired in the CFBD data (program not FBS then).'%school)
    if status=='too-new': notes.append('Only %d completed full season%s (through 2025); needs at least %d for the compared view.'%(len(tenure),'' if len(tenure)==1 else 's',MINT))
    if trans: notes.append('Started partway through %s: coached %s of %s games that season (interim or mid-season hire). That season is shown but excluded from both windows.'%(', '.join(map(str,trans)),', '.join(str(mine[y]['games']) for y in trans),', '.join(str(ts[(school,y)]['g']) for y in trans)))
    t_m=window(school,tenure[:N]) if status=='compared' else None
    t_f=window(school,tenure) if tenure else None
    # season rows
    rows=[]
    ys=list(range(max(2005,(before['years'][0] if before else (tenure[0] if tenure else 2026)-0)),2027)) if True else []
    start=(before['years'][0] if before else min(run))
    for y in range(start,2027):
        e=ts.get((school,y))
        if not e or not e['g']: continue
        who='tenure' if y in tenure else ('transition' if y in trans else ('2026' if y==2026 else 'before'))
        if y==2026: who='2026'
        r=rec.get((school,y)); t=tal.get((school,y)); p=epa.get((school,y))
        # for before years, label by whether it's in the matched before window
        if who=='before' and before and not (before['years'][0]<=y<=before['years'][1]): who='earlier'
        mw=None
        if status=='compared':
            if before['years'][0]<=y<=before['years'][1]: mw='before'
            elif y in tenure[:N]: mw='after'
        coach_g=mine[y]['games'] if y in mine else 0
        rows.append(dict(y=y,w=e['w'],l=e['l'],t=e['t'],who=who,win=mw,mine=coach_g,rec=list(r) if r else None,tal=[t[0],t[1]] if t else None,epa=dict(off=p['off'],de=p['de'],n=p['n']) if p else None))
    # prior head coaching stops (CFBD, FBS 2005+): seasons at other schools before first year here
    prior=collections.OrderedDict()
    for s in sorted(c['seasons'],key=lambda s:s['year']):
        if s['school']==school: continue
        if s['year']>=run[0]: continue
        k=s['school']; d=prior.setdefault(k,dict(school=k,from_=s['year'],to=s['year'],w=0,l=0,t=0,g=0))
        d['to']=s['year'];d['w']+=s['wins'];d['l']+=s['losses'];d['t']+=s['ties'];d['g']+=s['games']
    pr=[dict(school=d['school'],from_=d['from_'],to=d['to'],w=d['w'],l=d['l'],t=d['t']) for d in prior.values()]
    for d in pr: d['from']=d.pop('from_')
    # fix: prior stops at other schools in the same data may be after (returning); keep before only
    out.append(dict(slug=slug[school],school=school,name=nm,first=run[0],firstSeason=S if tenure else 2026,
        status=status,n=N if status=='compared' else 0,completed=len(tenure),notes=notes,
        before=before,after=t_m,tenure=t_f,seasons=rows,prior=pr))
print(collections.Counter(o['status'] for o in out))
json.dump(dict(built='2026-11-26',cfbdCalls=29,minSeasons=MINT,maxMatch=MAXN,lastCompleted=LAST,coaches=out),open('/workspace/hashmark-review/coaches/coaches.json','w'),separators=(',',':'))
