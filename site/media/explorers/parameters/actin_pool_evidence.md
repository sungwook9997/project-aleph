# Actin pool evidence: seven concentration inputs

**Advisory, not PI adjudicated.** Existing EXAMPLE tags, values and priors remain unchanged. No new concentration prior, training target, covariance or equilibrium claim is created. Source base `24b3a44cbd33dd34cde338483be19638aec1be1c`; atlas digest `4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e`.

The strongest evidence separates quantities rather than validating a single replacement vector. No matched endogenous MCF7 absolute assay was located for the seven current values. In the MCF7 FDAP paper, 100/10/200 µM are imposed model totals; its free and bound concentrations are conditionally derived from a fit of barbed-end concentration B and jasplakinolide Kvi. They are not three independently fitted parameters.

## Exact input inventory

| Parameter | Declared value | Meaning in inspected code | Evidence and unresolved issue |
|---|---:|---|---|
| `actin_chem.g_actin_total` | 100.0 µM | Total UNPOLYMERIZED actin inventory, including free and profilin/thymosin-bound pools; not total cellular actin. | AP01, AP02, AP03, AP04, AP11, AP12, AP13. 100 µM is an assumed input in the MCF7 FDAP model and a cross-cell review estimate. Funk total actin cannot supply this quantity. |
| `actin_chem.g_actin_free` | 0.5 µM | Imposed chemically free soluble actin initially placed in ATP state; not all mobile actin. | AP01, AP02, AP04, AP11, AP12, AP13. Critical concentration is an in-vitro/conditional boundary; 79% mobile Dronpa-actin is not chemically free ATP-actin. 1.98 µM in Kiuchi is model-derived under a different profilin total. |
| `actin_chem.profilin_conc` | 50.0 µM | Total finite profilin buffer, with bound plus unbound states in initial pool; isoform not resolved by the declaration. | AP01, AP02, AP03, AP10, AP11. Funk HT1080 PFN1 52±4 is a nearby total-protein observation with an assumed half-volume denominator; it is not an MCF7 measurement or universal 20–100 range. |
| `actin_chem.thymosin_conc` | 200.0 µM | Total finite thymosin buffer, bound plus unbound; declaration names beta4 but implementation pool is generic thymosin. | AP01, AP02, AP04, AP12, AP13. 200 µM is a Kiuchi model input; platelet 560 and chick-brain 50–60 differ in biology and method, not alternative MCF7 prior endpoints. |
| `actin_chem.cofilin_conc` | 20.0 µM | Finite cofilin molecule budget constraining decoration, not automatically free active dephosphorylated CFL1. | AP01, AP05, AP13, AP14. Review family values, Acanthamoeba actophorin and BHK mass fractions do not directly establish human cofilin 20 µM or a 10–40 uncertainty band. |
| `actin_chem.capping_conc` | 1.0 µM | Available CP inventory before initial tip binding; preparation then partitions it into free and tip-bound CP. Distinct from total cellular CP and the prepared free pool. | AP01, AP08, AP09. Neutrophil functional free capper 1–2 µM is a different context; amoeba CP:actin 1:150 needs matched actin/volume conversion. |
| `arp23.conc` | 2.0 µM | Initial free Arp2/3-complex concentration per accessible cortical-shell water in the inspected static constructor. | AP01, AP06, AP07. Amoeba Arp2 1.9 and Arp3 5.1 µM are separately measured per packed-cell volume; neutrophil complex 9.7 µM is not a cortical-shell calibration. |

The exact source strings, prior snapshots, declaration facets, frozen file hashes and bibliographic identity rows are preserved in the JSON. All numeric candidate sources are unregistered in the frozen KB. Vitriol2015 is SE514 / OK, but supports spatial pool distinctions rather than a numeric concentration. Identity approval alone is insufficient for a training target.

## Primary and provenance cards

### AP01 · Pollard2000

[Molecular Mechanisms Controlling Actin Filament Dynamics in Nonmuscle Cells](https://www.annualreviews.org/content/journals/10.1146/annurev.biophys.29.1.545). DOI `10.1146/annurev.biophys.29.1.545`. Review full text; Table 1 visually checked. Identity: unregistered; candidate ineligible.

**Anchor:** Table 1 p. 549; monomer discussion pp. 550–551. **Context:** Multiple, explicitly separated table columns; Acanthamoeba; Dictyostelium; unactivated neutrophils and platelets; Xenopus egg extract; yeast; Review aggregation including personal communications; not one joint experiment; Column-specific cellular/extract concentration; primary definitions differ.

- Table 1 Acanthamoeba: G-actin 100, profilin 100, ADF/cofilin 20, Arp2/3 2–4, capping protein 1 µM.
- Table 1 unactivated platelets: G-actin 220, thymosin-β4 550, ADF/cofilin 30, Arp2/3 9, capping protein 5 µM.
- Table 1 unactivated neutrophils: G-actin 300, Arp2/3 10, capping protein 1–2 µM; Xenopus extract G-actin 12, profilin 5 and thymosin-β4 20 µM.
- The inspected table does not establish universal profilin 20–100, thymosin 100–500, cofilin 10–40 or Arp2/3 1–2 µM uncertainty bands.

**Uncertainty:** Ranges are table summaries, not SD/SEM/CI or a covariance matrix.

**Transfer limit:** A table across cell types cannot be promoted to one matched MCF7 parameter vector. Citation columns bundle several studies; not every cell has a one-to-one primary locator.

[Checked full-text retrieval](http://cytomorpholab.com/wp-content/uploads/2021/11/publication_1-23.pdf).

### AP02 · Kiuchi2011

[Measurements of spatiotemporal changes in G-actin concentration reveal its effect on stimulus-induced actin assembly and lamellipodium extension](https://pmc.ncbi.nlm.nih.gov/articles/PMC3080261/). DOI `10.1083/jcb.201101035`. Primary full text, Fig. 1/3, Results and Methods. Identity: unregistered; candidate ineligible.

**Anchor:** Results: Estimation of cellular concentrations; Fig. 3; Methods: Model fitting of s-FDAP data. **Context:** Human; MCF7 breast carcinoma; Serum-starved, unstimulated baseline for jasplakinolide model; NRG experiments are separate; Dronpa-actin sequential fluorescence decay after photoactivation, jasplakinolide perturbation; relative mobile-actin signal; Model concentrations, not independently calibrated endogenous protein per measured aqueous volume.

- G-actin total 100, profilin total 10 and thymosin-β4 total 200 µM are assumed inputs traced to Mogilner2002, not absolute measurements by this study.
- Conditional model outputs: free G-actin 1.98, profilin-bound actin 9.52, thymosin-bound actin 88.5 µM; free profilin 0.48 and thymosin 111.5 µM.
- Best-fit free barbed ends 4.8 nM and jasplakinolide Kd 120 nM; inferred pointed ends about 5.52 nM. Initial G-actin components sum to the imposed 100 µM. The three pools are conditionally derived from fitted B under the fixed assumptions, not independently fitted parameters.
- Fig. 1 mobile Dronpa-actin fraction 79% is not the fraction of chemically free ATP-actin.

**Uncertainty:** Fig. 3 time-course means±SEM, 13–21 cells across at least three experiments; confidence intervals on inferred concentrations not located. Time-curve SEM is not a concentration prior width.

**Transfer limit:** A shared MCF7 name does not convert model assumptions into absolute assays. Current profilin input 50 differs from this model input 10 µM; its derived free pool cannot be substituted into the current tuple.

**Source comparison group (source analysis only):** `Kiuchi2011_Fig3_conditional_Jasp_model`; current template inputs are not established as members of that source fit/accounting, and no covariance is inferred.

**Assumptions:** Unstimulated steady state and high ATP; Assumed G/P/T totals 100/10/200 µM; Specified association/dissociation rates; barbed-end loss and pointed-end addition neglected; Bath jasplakinolide treated constant with rapid pointed-end inhibition.

[Checked full-text retrieval](https://pmc.ncbi.nlm.nih.gov/articles/PMC3080261/?pdf=1).

### AP03 · Funk2019

[Profilin and formin constitute a pacemaker system for robust actin filament growth](https://elifesciences.org/articles/50963). DOI `10.7554/eLife.50963`. Primary full text; Fig. 1D visually checked. Identity: unregistered; candidate ineligible.

**Anchor:** Fig. 1D; Methods: quantitative Western blotting and cell-volume determination. **Context:** Human and mouse; HT1080, B16F10, EL4, mouse BMDC and primary mouse neutrophils; Cultured cell lines/primary preparations; not MCF7; Purified-protein-calibrated Western blots plus cell counting and fluorescence-exclusion whole-cell volume; HALF measured whole-cell volume assumed accessible to soluble proteins.

- HT1080 total actin 180±33 and PFN1 52±4 µM; B16F10 151±4 and 66±8; EL4 180±13 and 115±23.
- BMDC total actin 192±12, PFN1 144±14 and PFN2 54±9 µM; neutrophils actin 196±35 and PFN1 111±18 µM.
- These are total actin/profilin measurements. Profilin-actin concentration is subsequently inferred by near-saturation of profilin with actin.
- The half-volume convention may overestimate concentrations by up to twofold if the entire measured volume is accessible, as the authors note.

**Uncertainty:** Protein values mean±SD, N=3 independent experiments. Volume distribution is a separate sample: HT1080 2044±876 µm³, at least 300 cells/type. These do not provide matched per-cell covariance.

**Transfer limit:** Total actin includes polymerized material and does not measure g_actin_total. Total PFN1 cannot by itself specify free profilin, profilin-actin, nucleotide state, or the MCF7 buffer pool.

**Assumptions:** Profilin-actin estimate assumes abundant ATP soluble actin, rapid near-equilibrium binding and no sufficiently strong competing pool.

[Checked full-text retrieval](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6867828/fullTextXML).

### AP04 · Weber1992

[Interaction of thymosin beta 4 with muscle and platelet actin: implications for actin sequestration in resting platelets](https://pubmed.ncbi.nlm.nih.gov/1627561/). DOI `10.1021/bi00142a002`. Primary abstract only; full assay/volume methods not verified. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract. **Context:** Not explicit in checked abstract; Resting platelets; Monomeric actin and thymosin measured; in-vitro 1:1 binding to platelet/muscle actin; Cellular µM; original volume conversion not recovered.

- Reported resting-platelet monomeric actin 280 µM and thymosin-β4 560 µM.
- Platelet-actin binding Kd 0.4–0.7 µM; thymosin-actin 70–240 µM calculated using Kd 0.7 µM and assumed free-actin 0.1–0.5 µM.

**Uncertainty:** No SD/SEM, replicate count or volume uncertainty identified in abstract. Kd/conditional complex ranges are not population SDs.

**Transfer limit:** The free-actin interval is a critical-concentration/capping assumption, not a direct intracellular free-actin measurement; resting platelet totals do not establish MCF7 values.

### AP05 · Koffer1988

[Identification of two species of actin depolymerizing factor in cultures of BHK cells](https://link.springer.com/content/pdf/10.1007/BF01773875.pdf). DOI `10.1007/BF01773875`. Primary full text pp. 320–328. Identity: unregistered; candidate ineligible.

**Anchor:** Results p. 323 and Discussion p. 327; Methods pp. 320–321. **Context:** Hamster; BHK21/C13 cultured cells; DMEM+10% FCS; trypsin-harvested; cold fractionation; Western blot against chick ADF standard and silver-stained electrophoretic bands; Percentage of total soluble protein; not directly µM in live accessible water.

- Two immunoreactive species, 19 and 20 kDa. Western estimates 0.4% and 0.06% of soluble protein are minima because cross-reactivity is uncertain.
- Silver staining instead gives about 0.4% and 1.3%; disagreement reflects assay/protein-identification limitations.
- Discussion cites actin ~67 µM from prior work; the 60–85% monomer fraction refers to cold cell lysates.

**Uncertainty:** Method-dependent estimates are not biological uncertainty intervals; sample-size/SD for a 20 µM cofilin estimate not found.

**Transfer limit:** This paper does not directly establish 20 µM human cofilin. Historical ADF/cofilin-family identity, phosphorylation, soluble fraction and mass-to-volume conversion require explicit resolution.

### AP06 · Kelleher1995

[Sequences, structural models, and cellular localization of the actin-related proteins Arp2 and Arp3 from Acanthamoeba](https://pmc.ncbi.nlm.nih.gov/articles/PMC2199984/). DOI `10.1083/jcb.131.2.385`. Primary PDF, quantitation p. 387 and Results p. 392. Identity: unregistered; candidate ineligible.

**Anchor:** Quantitation of Arps p. 387; Results p. 392; fractionation/localization discussion. **Context:** Acanthamoeba; Log-phase cultured amoebae; Quantitative immunoblotting with recombinant Arp standards, calibrated by Coomassie staining against actin; Packed amoeba pellet; assumes 1 g pellet equals 1 mL.

- Separate cellular concentrations: Arp2 1.9 µM and Arp3 5.1 µM. The paper reports Arp3 in excess of Arp2 and other complex subunits.
- Cortical enrichment is localization evidence, not a calibrated cortical-shell aqueous concentration.

**Uncertainty:** Numerical SD/CI and assay-specific n for the 1.9/5.1 estimates not located; fractionation replicate statements do not establish the n of concentration calibration.

**Transfer limit:** Neither subunit concentration is automatically the concentration of intact, available Arp2/3 complexes. Current arp23.conc initializes a cortical-shell-water pool in static code; packed-cell average and shell concentration differ.

[Checked full-text retrieval](https://scholarworks.indianapolis.iu.edu/bitstreams/67963781-76c0-4056-8acf-8de2850ab9ad/download).

### AP07 · Higgs1999

[Influence of the C terminus of Wiskott–Aldrich syndrome protein (WASp) and the Arp2/3 complex on actin polymerization](https://pubmed.ncbi.nlm.nih.gov/10563804/). DOI `10.1021/bi991843+`. Primary abstract; 1999 conversion methods not recovered. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract. **Context:** Human; Neutrophils; Cellular Arp2/3 concentration reported; full 1999 calibration method not recovered; Cellular concentration; exact excluded-volume convention not verified.

- Arp2/3 concentration 9.7 µM reported in human neutrophils.

**Uncertainty:** No SD/SEM/n checked; one abstract point estimate.

**Transfer limit:** Neither neutrophil state nor absolute compartment denominator matches the MCF7 cortical-shell free pool. A later WASp paper cannot substitute its volume assumptions for the 1999 Arp measurement.

### AP08 · DiNubile1995

[Actin filament barbed-end capping activity in neutrophil lysates: the role of capping protein-beta 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC301323/). DOI `10.1091/mbc.6.12.1659`. Primary abstract; full species/volume method not checked. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract: barbed-end capping, seed adsorption and immunoadsorption. **Context:** Not confirmed in checked abstract; Neutrophils; High-speed lysate supernatant, submicromolar calcium, at least 100-fold cytoplasm dilution; spectrin-actin seed adsorption; Estimated intact-cell concentration of free capper from lysate activity.

- Available/free capper estimated at approximately 1–2 µM; the pool is functionally defined.
- Removing more than 90% CPβ2 removed about 90% activity; extensive gelsolin removal did not reduce activity.

**Uncertainty:** The 1–2 interval is an activity-derived estimate, not a reported SD or transferable concentration prior.

**Transfer limit:** Functional free capper must not be equated to the declared inventory without the preparation stage: the finite constructor initially stores available CP as FREE_C, then initial tip binding consumes part of that pool. Extraction/dilution, species, cell state, volume and bound/free accounting remain unresolved.

### AP09 · Cooper1984

[Acanthamoeba castellanii capping protein: properties, mechanism of action, immunologic cross-reactivity, and localization](https://pmc.ncbi.nlm.nih.gov/articles/PMC2275627/). DOI `10.1083/jcb.99.1.217`. Primary abstract; available XML has PDF-only body. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract. **Context:** Acanthamoeba castellanii; Amoebae; Immunological quantification and crude fractionation; Molar CP:actin ratio and fraction of CP.

- Capping protein:actin molar ratio 1:150; about one-third CP in crude membrane fraction and two-thirds soluble.

**Uncertainty:** No absolute-concentration error or matched-volume uncertainty verified.

**Transfer limit:** A ratio cannot establish 1 µM without a matched actin amount and volume; soluble CP is not necessarily unbound active capper.

### AP10 · Tseng1984

[Physical, immunochemical, and functional properties of Acanthamoeba profilin](https://pmc.ncbi.nlm.nih.gov/articles/PMC2113022/). DOI `10.1083/jcb.98.1.214`. Primary abstract; full table uncertainty not verified. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract: antibody quantitation. **Context:** Acanthamoeba; Amoebae; Antibody binding against profilin; Per liter of cells; not explicitly accessible cytosolic water.

- Profilin is about 2% amoeba protein, or 100 µmol per liter of cells.

**Uncertainty:** No primary table SD/n verified; a secondary snippet is not adopted as an uncertainty anchor.

**Transfer limit:** This supports a specific amoeba total-profilin estimate, not a mammalian 20–100 interval or a free-profilin concentration.

### AP11 · Kaiser1999

[Profilin is predominantly associated with monomeric actin in Acanthamoeba](https://doi.org/10.1242/jcs.112.21.3779). DOI `10.1242/jcs.112.21.3779`. Primary author PDF abstract and Methods p. 3781; author-host URL subsequently returned 404. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract and Methods p. 3781. **Context:** Acanthamoeba castellanii, Neff strain; Log-phase amoebae; Gel filtration, selective antibody immunoadsorption and cellular fluorescence; Fraction of profilin associated with monomeric actin.

- Gel filtration gives approximately 60% bound and 40% free profilin; immunoadsorption 65% bound; cellular fluorescence estimates 74–89% bound.

**Uncertainty:** Between-assay estimates/ranges are not SD/SEM; no matched-cell covariance or numerical prior follows.

**Transfer limit:** Fractions have a profilin denominator, not total actin. Different methods and extract dilution must remain distinct; these are not an absolute MCF7 pool census.

[Checked full-text retrieval](https://pollardlab.yale.edu/sites/default/files/files/bibliography/170.pdf).

### AP12 · Vitriol2015

[Two Functionally Distinct Sources of Actin Monomers Supply the Leading Edge of Lamellipodia](https://pmc.ncbi.nlm.nih.gov/articles/PMC4418508/). DOI `10.1016/j.celrep.2015.03.033`. Primary full text and frozen KB SE514 identity audit. Identity: SE514 / OK.

**Anchor:** Results and Methods: photoactivation, Tβ4 depletion and lamellipodial actin. **Context:** Mouse; CAD neuron-derived line; DMEM/F12+8% FCS; laminin-coated coverslips; transfected actin probes; PA-GFP-actin, G/F proxy imaging and perturbation; Spatial flux/pool behavior, not an absolute molar concentration assay.

- Cytosol-derived, Tβ4-dependent monomers supply the leading edge, while locally recycled lamellipodial monomers show a distinct dependence.

**Uncertainty:** No concentration uncertainty extracted; identity audit OK does not change this limitation.

**Transfer limit:** Supports keeping spatial and chemical pools distinct. It supplies no numeric MCF7 concentration, covariance or automatic joint equilibrium.

[Checked full-text retrieval](https://pmc.ncbi.nlm.nih.gov/articles/PMC4418508/?pdf=1).

### AP13 · Devineni1999

[A quantitative analysis of G-actin binding proteins and the G-actin pool in developing chick brain](https://pubmed.ncbi.nlm.nih.gov/10095019/). DOI `10.1016/S0006-8993(99)01147-6`. Primary abstract; detailed conversion and uncertainty not checked. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract. **Context:** Chicken; Developing brain tissue, average-cell estimate; Embryonic days 13 and 17; Quantifies G-actin-binding proteins, distinguishes phosphorylated/unphosphorylated ADF/cofilin; Estimated average brain-cell concentration; heterogeneous tissue.

- G-actin estimated 30–37 µM and Tβ4 50–60 µM; free critical actin estimated about 0.45 µM on day 13 and 0.2 µM on day 17.
- Unphosphorylated soluble ADF:Tβ4 ratio shifts from 1:7 to 1:4; developmental conditions are separate observations.

**Uncertainty:** Full calibration, volume conversion, n and SD not verified. No covariance constructed from the reported ranges.

**Transfer limit:** Useful precedent for measuring related pools in matched samples, not a mammalian prior. Free concentrations are derived, and age/tissue ranges do not define uncertainty for a single cell state.

**Source comparison group (source analysis only):** `Devineni1999_developmental_pool_analysis`; current template inputs are not established as members of that source fit/accounting, and no covariance is inferred.

### AP14 · Cooper1986

[Purification and characterization of actophorin, a new 15,000-dalton actin-binding protein from Acanthamoeba castellanii](https://pubmed.ncbi.nlm.nih.gov/3941084/). DOI `10.1016/S0021-9258(17)42495-1`. Primary abstract verified by PMID; DOI is a candidate metadata match, not independently resolved here. Identity: unregistered; candidate ineligible.

**Anchor:** Primary abstract. **Context:** Acanthamoeba castellanii; Amoebae; Purification and actophorin quantitation; mg actophorin per gram cells; actin:actophorin ratio.

- Actophorin 0.4±0.1 mg/g cells; actin:actophorin about 10:1.

**Uncertainty:** The abstract does not identify whether ±0.1 is SD, SEM or another uncertainty; n not recovered.

**Transfer limit:** Actophorin is not automatically human CFL1; conversion to molar concentration requires molecular mass, cell/pellet density and an explicit accessible volume. No such replacement is proposed.

## Catalog lineage

- [BNID112131](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=112131&s=n&v=1): Generic cytoplasmic G-actin about 100 µM. Kiuchi2011 introductory text cites Pollard2000; catalog value is not a new measurement. Candidate trace only; the declaration gives no BNID identifier.
- [BNID112134](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=112134&s=n&v=1): G-actin/profilin/Tβ4 100/10/200 µM. Explicitly assumptions in Kiuchi2011 pp. 368–370, referring to Mogilner2002; derived fractions belong to the conditional model. Explains 100/200 reuse but does not validate current profilin50 or free0.5.
- [BNID109809](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=109809&s=n&v=1): Free ATP-actin 0.1–1 µM, unspecified eukaryote. Dominguez2011 review p. 174 cites Pollard/Borisy2003 review (PMID12600310); original primary absolute free-actin assay still unresolved. Range matches declaration, but its anonymous BNID citation cannot be conclusively identified.
- [BNID109811](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=109811&s=n&v=1): Barbed-end critical concentration about0.1 µM. Dominguez2011 review; a polymerization critical concentration is distinct from a measured intracellular free pool. Do not map this ID to total cellular or total G-actin merely because other prose mentions20–100 µM.

## Quantity relationships and static-code limits

**The seven µM inputs do not share one denominator.** Static growth `conc_unit` uses `V_geom = membrane.volume0 − envelope.volume0` with no water fraction; the optional finite-buffer constructor inherits that unit for G-actin, profilin, thymosin and capper. Cofilin budget uses `V_geom × water_fraction`. Arp2/3 uses cortical thin-shell volume `4πr_shell²h × water_fraction`. These are neither automatically whole-cell volume nor the half-cell volume assumed by Funk2019.

**Path scope:** frozen `actin_chem.unit_chemistry_enabled = 0` does not enter the guarded finite-buffer wiring. The code inventory below describes that optional constructor; `g_actin_free` also feeds base growth directly. Static inspection does not establish a live run’s effective settings or consumption.

The soluble actin inventory is free plus profilin-bound plus thymosin-bound actin. Profilin and thymosin totals each include their free and bound pools. Polymerized actin is a separate inventory. The initializer distributes bound material subject to finite buffer capacity using an auxiliary activity; it expressly does **not** assert that this activity equals the imposed free concentration or establishes equilibrium. These are inspected code semantics, not observed runtime behavior.

- `C01`: `aleph/cell/unit_chemistry.py:22–70`, SHA256 `8737ccf27a039b4621c2cd9757c76a7af48b057480486eb27072b96be1a2f70f`. Separate soluble actin/P/T/CP inventories. ATP free and P/T-bound actin initialized; P/T inputs are buffer totals, CP enters free_cap; polymer inventory is explicitly separate.
- `C02`: `aleph/cell/growth_preparation.py:64–103`, SHA256 `65a85ec06a84485647db42af8d7dd0f0a2a6c2b1228e40282335c6734a8655d6`. Auxiliary activity solves sum(B_i*a/(Kd_i+a))=total-free with finite buffers. This activity need not equal separately imposed free concentration; code explicitly denies an equilibrium claim.
- `C03`: `aleph/cell/severing.py:133–138`, SHA256 `8d6d9c55f78424d5d65fc304e01ed5fbabff09a6adb5cf0d4f67b534d6eb0da3`. Cofilin concentration times pool volume times cytosolic-water fraction creates a finite molecule budget and decoration ceiling; does not identify chemically free/active cofilin in an assay.
- `C04`: `aleph/cell/nucleotide_composition.py:175–196`, SHA256 `d57be7d9c1a62a8ee0a33da1069e92e7dca7e45086a3210be02491485acbcbcd`. Arp2/3 initial free count uses cortical-shell accessible water; activity factor is total water/shell water. This is a static formula, not evidence of current runtime consumption.

- `C05`: `aleph/cell/assemble.py:875–979`, SHA256 `da13bf88decb033fdeec51a533dcc87f8926c882d4f320446e117e9bf9ea13bd`. Growth pool V_geom=membrane.volume0−envelope.volume0; conc_unit=1/(602.214×V_geom), without water fraction. g_actin_free feeds base growth concentration. Optional unit chemistry is gated at line977.
- `C06`: `aleph/cell/assemble.py:1268–1281`, SHA256 `da13bf88decb033fdeec51a533dcc87f8926c882d4f320446e117e9bf9ea13bd`. Chemical bath uses V_geom×water_fraction; its Arp shell argument uses cortex_shell_volume×water_fraction.
- `C07`: `aleph/cell/build/part.py:916–938`, SHA256 `3d5fbf0a6d82a250149b8d4a62ea4bc9376cb6ddf06d17e9b69b6fda380c4e0a`. Cortex thin-shell geometry uses 4πr_shell²h, with r_shell derived from cell radius, gap and half thickness.

## Exact missing measurements and next source work

- `actin_chem.g_actin_total`: Matched MCF7 absolute unpolymerized endogenous actin per defined aqueous volume, with F/G separation recovery and nucleotide/complex composition.
- `actin_chem.g_actin_free`: Matched MCF7 free ATP-G-actin measurement or identifiable conditional model with verified total/binding inputs, nucleotide state and uncertainty.
- `actin_chem.profilin_conc`: MCF7 endogenous PFN1/PFN2 totals and complex/free partition per matched aqueous volume, with cell state and calibration uncertainty.
- `actin_chem.thymosin_conc`: MCF7 Tβ4/Tβ10 identities and total concentration, complex partition and calibration volume under the same actin assay.
- `actin_chem.cofilin_conc`: MCF7 CFL1/ADF/CFL2 abundance, phosphorylation, actin-bound/free fractions and accessible volume; match the species counted by the decoration budget.
- `actin_chem.capping_conc`: MCF7 CP isoform/intact heterodimer abundance plus free functional availability, assay inhibition/state and matched volume.
- `arp23.conc`: MCF7 intact assembled Arp2/3 complexes, available versus engaged states and cortical-shell enrichment/aqueous volume, not isolated subunit abundance.

## PI proposals

- **AP-PI-01:** Preserve total, free, bound, active and assembled-complex quantities separately in the evidence graph and outer-network features; require explicit object/denominator matches before supervision. Advisory metadata only; no runtime or prior edit.
- **AP-PI-02:** Prioritize one matched MCF7 multi-pool assay/census with whole-cell versus accessible-water definition, F/G separation and protein isoforms. If unavailable, keep context transfer unresolved rather than assemble cross-cell priors. No new numeric band proposed.
- **AP-PI-03:** Register and identity-audit the strongest candidate sources, beginning Kiuchi2011, Funk2019, Kelleher1995 and DiNubile1995, then review exact claim eligibility separately. No KB/mirror mutation performed.
- **AP-PI-04:** Visualize model-assumption→fit-output and protein-mass→volume-conversion edges distinctly from direct measurements; group shared fits without inventing covariance. No model training or fitted covariance.

## Reference registry and validation

| Reference | DOI | Frozen identity |
|---|---|---|
| Pollard2000 | `10.1146/annurev.biophys.29.1.545` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Kiuchi2011 | `10.1083/jcb.201101035` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Funk2019 | `10.7554/eLife.50963` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Weber1992 | `10.1021/bi00142a002` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Koffer1988 | `10.1007/BF01773875` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Kelleher1995 | `10.1083/jcb.131.2.385` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Higgs1999 | `10.1021/bi991843+` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| DiNubile1995 | `10.1091/mbc.6.12.1659` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Cooper1984 | `10.1083/jcb.99.1.217` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Tseng1984 | `10.1083/jcb.98.1.214` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Kaiser1999 | `10.1242/jcs.112.21.3779` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Vitriol2015 | `10.1016/j.celrep.2015.03.033` | SE514; OK |
| Devineni1999 | `10.1016/S0006-8993(99)01147-6` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Cooper1986 | `10.1016/S0021-9258(17)42495-1` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Mogilner2002 | `10.1016/S0006-3495(02)73897-6` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |
| Dominguez2011 | `10.1146/annurev-biophys-042910-155359` | UNREGISTERED_IN_FROZEN_KB; candidate ineligible |

All duplicate DOI UIDs would be retained; no duplicate was found for these references. The registry preserves the full matching source/audit records. Cooper1986 DOI is a candidate metadata match; the primary abstract is identified by PMID3941084. The Kaiser author bibliography had inconsistent pagination; journal DOI pagination is retained, with retrieval limitations recorded.

- PASS: exact_7_name_set.
- PASS: declarations_and_priors_equal_frozen_atlas.
- PASS: all_tags_remain_EXAMPLE.
- PASS: all_ref_UID_and_audit_snapshots_exact.
- PASS: all_card_refs_present_on_rows.
- PASS: all_code_anchors_match_frozen_base.
- PASS: no_promotion_or_training_targets.
- PASS: expected_single_registered_identity.
- PASS: local_only_cache_files_exist.

Inputs:
- `atlas.json`: `523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a`.
- `kb_snapshot.json`: `134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b`.
- `declaration_facets.json`: `db0024384de846b9dc68bee6ca53d63084d4acbad0880c2786ba7808974ac43e`.
- `example_review.json`: `96cc07083e3a1f0b0ff900fd63eef2c57dc95e93a0f2e94096b0331cd6783437`.
- `uncertainty_review.json`: `38632435dd7c896642d1e1389d4a4e0ccf8dd3ba177d2614befadacf3155846e`.

Only the two authorized review outputs and agent-owned local source caches were written. No source/runtime modules were imported. Raw articles are held only under the ignored local cache; their hashes are in the JSON retrieval manifest.

Additional static checks: augmented anchors match the frozen base; finite-pool switch snapshot is0; fitted parameters and conditional derived concentrations are distinct in JSON.

### 원문 분석과 현재 입력의 관계

Kiuchi의 조건부 적합과 Devineni의 공동 pool accounting은 원문 분석에만 속합니다. `source_comparison_groups`로 보존하며 현재 7개 입력의 `same_fit_groups`는 빈 배열입니다. 현재 값들이 함께 관측·적합되었다는 근거나 공분산을 만들지 않습니다.
