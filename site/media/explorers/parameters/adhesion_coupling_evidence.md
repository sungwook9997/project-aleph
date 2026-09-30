# Adhesion coupling: source observations and conditional mappings

Advisory primary-source review of **16 frozen declarations: ERM 7, clutch 5, integrin density 1, LINC 3**. Tags remain **8 EXAMPLE, 4 SOURCED, 4 SWEPT**. No values, ranges, priors, source records, physical mechanisms or PI decisions changed. No simulation, training, source-paper code or new latent labels were produced.

The JSON preserves the exact declarations and priors from `24b3a44cbd33dd34cde338483be19638aec1be1c`, all matching KB rows and duplicate UIDs. Its 10 source cards, 8 conditional relations and 12 source-estimation groups describe evidence provenance. They add **zero current fit memberships and zero covariances**. A source-audit OK is bibliographic identity only.

## Findings that affect interpretation

| Card | Primary source and anchor | What is established; what remains conditional |
|---|---|---|
| AC01 | [Braunger 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC3975028/), Figs.7–8, stiffness discussion | The 294 K ezrin-T567D/actin rupture fit contains 1.3/s and 0.7 nm. The 4.6 pN/nm stiffness is a separate mean/variance inference with a Poisson bond-number assumption. No ezrin association rate or common covariance for all three is supplied. |
| AC02 | [Diz-Muñoz 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC2994655/), Fig.1H/S2G, Table S1, methods | Approximately 600 active links/um² and 41 nm spacing are one model-conditioned tether inference in zebrafish progenitors. Fixed viscosity, bending rigidity and lipid tension enter. This is not an independent pair of counts and spacing, nor directly the frozen model's available capacity. |
| AC03 | [Coscoy 2002](https://pmc.ncbi.nlm.nih.gov/articles/PMC130542/), Table1/Fig.4e | Under the reaction-limited interpretation, the short-time exchange fraction is about 25% of membrane ezrin. A 5.7 s reaction fit and a slow-diffusion fit both describe the incomplete recovery. The separate 1–2 min quantity is a half-time. These observations do not identify 75% mechanically occupied linkers or a microscopic on/off pair. |
| AC04 | [Charras 2006](https://pmc.ncbi.nlm.nih.gov/articles/PMC2064524/), Fig.5D/methods | 4.87±3 s is ezrin appearing before actin, mean±SD over 23 blebs. It is not the complete membrane-healing time. The whole cortex assembly is described on an approximately 30 s scale. |
| AC05–06 | [Alert 2015](https://pmc.ncbi.nlm.nih.gov/articles/PMC4407260/), Eqs.2–5/Table1; [Rognoni 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3511698/), Figs.2–4 | Alert's 1e4/10 per-second inputs are attributed to filamin work. Critical occupancy near 0.9 is a conditional model result. Rognoni distinguishes tethered peptide rates, solution concentration coefficients and a separate autoinhibition gate. The exact branch behind Alert's rounded pair is unresolved without the SI. |
| AC07 | [Chan's official 2008 thesis](https://conservancy.umn.edu/server/api/core/bitstreams/d4cfb7c0-9a53-4235-80c8-2cc82bf1647c/content), Table2-1 printed p44; [Bangasser 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3736748/), Table1 | Thesis: count75, on-rate1/s, off-rate0.1/s, signed force−2 pN, stiffness5 pN/nm. Later model: count50, on-rate0.3/s, off-rate0.1/s, force2 pN, stiffness0.8 pN/nm. These are model inputs. The exact Science2008 SI was not acquired, so the current mixed attribution remains a version gap rather than a proved Science-table error. |
| AC08 | [Kong 2009](https://pmc.ncbi.nlm.nih.gov/articles/PMC2712956/), Figs.3–6/methods | Alpha5beta1–fibronectin lifetimes depend on force, cations, construct and capture linkage. Catch behavior at 10–30 pN does not directly measure a 2 pN scale for the whole integrin–talin–actin clutch. Above30 pN some conditions are limited by the capture bond. |
| AC09 | [Déjardin 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7659719/), Fig.1/S5 and discussion | The calibrated mini-nesprin sensor can reach the upper8 pN response range. This is not a uniform force on every LINC complex, and does not determine stiffness or density. Construct-dependent compression complicates the absolute interpretation. |
| AC10 | [Clausen 2017](https://doi.org/10.1088/1361-6463/aa52a1), Fig.6 | Peak-to-peak separation and a cortex-boundary gap are different observables. Inferred boundary gaps below10 or up to20 nm are not measurements of ERM rest length or a45 nm node-pairing reach. |

## Frozen code correspondence

Eight saved source spans are pinned to exact Git bytes and line hashes; only static text was read.

- `erm.areal_density` allocates owner capacity from membrane area, capped by represented nodes. Reach, partner geometry and the stationary-state draw additionally determine which owners begin bound. A source-inferred *active* density therefore requires an explicit population mapping.
- `erm.r0` shifts the cortex shell. ERM relations use their actual built separation as rest length; `erm.reach` filters node candidates. This distinction prevents assigning a microscopy gap to the wrong code quantity.
- In the frozen suspended specimen, integrin engagement and the clutch are explicitly absent. A published adherent filopodium model does not establish active clutch relations in that preparation.
- `linc.areal_density` controls lamina–envelope owners. IF–envelope relations instead use the first node of each IF strand. `linc.tension` is an observer comparison target; the target/stiffness shortening diagnostic does not impose prestress.

A closed, constant-rate two-state system would relate occupancy to on/(on+off) and relaxation rate to on+off. This is only an identifiability example, conditional on the same tracked population, fixed rates, zero load, stable geometry, negligible transport and an appropriate observation model. The reviewed FRAP/arrival data do not establish those conditions for current ERM.

## Identity, history and remaining work

Braunger SE543, Kong SE61 and Déjardin SE451 have matching OK identities. Chan's SE58 and SE559 duplicate OK records are both preserved. Bangasser SE59 is retained as a separate supporting record. The other DOI candidates and the separate author thesis remain ineligible pending source audit and owner validation. No mixed OK/non-OK DOI duplicate was found in this scope. The historical raw wording that says some sources are absent from the audit remains unchanged and is not the new identity verdict.

Eighteen historical records are pinned by exact file hash, JSON pointer and canonical record hash at `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09`. They include the relevant EXAMPLE groups/rows, SOURCED rows and the integrin uncertainty row. Reinspection is not counted as new independent evidence.

Original Science SI and Rognoni SI are unresolved acquisition gaps. No primary support for the current integrin300/um², LINC10/um² or LINC100 pN/um was found in this bounded set. That is an **unlocated-support result**, not proof the values are false. A current MCF7 mapping still needs the receptor/linker population, activated or engaged fraction, membrane versus adhesion-area denominator, cell state, construct and observable to be specified. The historical cross-paper Tinevez force-per-link comparison was not independently adjudicated here.

All full-text, extracted text and source-page images are ignored local research caches. Only the short retrieval metadata and review packet are versionable. Source-file and document-span hashes permit local inspection without shipping paper copies.

## Metadata validation

Exact16-row selection and raw declarations/priors checked; all review/source/group/code references close; duplicate identity pairing checked; source cache hashes checked. JSON contains18 immutable historical records,10 cards,8 code spans and8 conditional relations. Physics, training and full integration tests were not run.

독립 재검토 보강: Kong의 >30 pN capture 제한은 full extracellular construct의 Mg/EGTA·Mn 조건입니다. Headpiece에서는 >25 pN, 세 cation 조건 모두를 별도로 보고합니다. Coscoy의 약25%는 reaction-limited 해석에 조건부이며 확정된 교환 census가 아닙니다.
