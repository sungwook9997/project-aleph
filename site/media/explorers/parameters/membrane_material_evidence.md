# Membrane material source review

Advisory review of eight valued EXAMPLE declarations and one SOURCED bending context in the frozen atlas. Values, tags, priors, source registry and runtime are unchanged. All candidates remain ineligible for training; current same-fit groups are empty and covariance is null.

The nine source cards include one review and eight primary experiment, theory or simulation records. These counts do not represent independent observations. P14/P15 and earlier bending/lysis reviews are retained as historical evidence, not counted again.

| Frozen parameter | Saved value and unit | Source mapping |
|---|---|---|
| `membrane.area_modulus` | 200000.0 pN/um (EXAMPLE) | MM01, MM02 |
| `membrane.areal_density` | 0.005 pg/um^2 (EXAMPLE) | Declaration arithmetic only |
| `membrane.viscosity_2d` | 0.001 pN.s/um (EXAMPLE) | MM02, MM03, MM04, MM05, MM09 |
| `membrane.lipid_diffusion` | 1.0 um^2/s (EXAMPLE) | MM05, MM09 |
| `membrane.kappa_gauss` | -0.066 pN.um (EXAMPLE) | MM06 |
| `membrane.lipid_area_per_molecule` | 7e-07 um^2 (EXAMPLE) | MM07 |
| `membrane.lysis_strain` | 0.03 1 (EXAMPLE) | MM08, MM01 |
| `membrane.spontaneous_curvature` | 0.0 1/um (EXAMPLE) | MM06, MM02 |
| `membrane.kappa_bend` | 0.0828 pN.um (SOURCED) | MM01, MM02, MM06 |

The main distinction is between pure-bilayer material response and cell effective response. A modulus inferred from membrane area reservoirs or an obstacle-dependent transport model cannot replace a molecular area-stretch modulus simply because the units match. Likewise, bead diffusion, protein-tracer diffusion, lipid self-diffusion and tension propagation must retain their observation definitions.

## Source cards

### MM01 — Effect of chain length and unsaturation on elasticity of lipid bilayers

[10.1016/S0006-3495(00)76295-3](https://pmc.ncbi.nlm.nih.gov/articles/PMC1300937/) · primary_experiment_abstract_reinspection · SE211: paired UID/DOI audit OK, identity only.

Low-tension apparent expansion includes undulation smoothing; high-tension molecular stretch needs residual-undulation correction. Mean direct modulus is 243 mN/m; bending varies by composition. No unique target-cell 20 kBT point or current MCF7 modulus. SE211 OK resolves identity only, despite the declaration registration caveat.

**Unit of observation:** Vesicle expansion curves; aggregate comparison across lipid compositions

**Anchor/access:** Abstract, Biophys J 79:328–339; earlier Table 1/Methods claim stays historical, not freshly verified here. Primary abstract and bibliography; linked PDF and BioC full text not recovered.

### MM02 — A practical guide to giant vesicles. Probing the membrane nanoregime via optical microscopy

[10.1088/0953-8984/18/28/S04](https://www.mpikg.mpg.de/th/people/dimova/publications/Dimova%20JPhysCondMat%2006.pdf) · secondary_review · Unregistered in the saved KB; candidate ineligible.

Section 5.2 gives typical shear surface viscosity 2–5 × 10^-6 dyn s/cm; Table 1 cites Dimova 1999 for approximately 5 × 10^-6. These are source ancestry, not independent observations. Current 0.001 pN.s/um = 1e-9 Pa.s.m lies below that stated typical interval; exact chosen-point support unlocated. Bulk viscosity requires thickness definition.

**Unit of observation:** Compilation of previous experiments, not a new vesicle cohort

**Anchor/access:** Table 1 pS1154; Section 5.2 pS1165; Fig. 9. Full author-hosted review PDF.

### MM03 — Falling ball viscosimetry of giant vesicle membranes: Finite-size effects

[10.1007/s100510051042](https://www.mpikg.mpg.de/th/people/dimova/publications/Dimova%20EPJE%2099.pdf) · primary_experiment · Unregistered in the saved KB; candidate ineligible.

Finite-size inversion supports 3 × 10^-6 surface poise in selected ideal vesicles. Contacts and rotation hindrance contribute scatter; it is not a biological viscosity distribution. Approximately ±30% is an estimation-error statement, not identified SD/SEM/CI. MM02 cites this study; do not count its review summary again.

**Unit of observation:** Particle trajectories on individual vesicles; selected near-ideal subset used for inversion

**Anchor/access:** Fig. 7; Sections 5–6 pp596–598; Section 2 setup. Full author-hosted primary PDF.

### MM04 — Pretransitional effects in DMPC vesicle membranes: Optical dynamometry study

[10.1016/S0006-3495(00)76296-5](https://www.mpikg.mpg.de/th/people/dimova/publications/Dimova%20BJ%2000.pdf) · primary_experiment · Unregistered in the saved KB; candidate ineligible.

Viscosity increases near the transition; long-range bead motion becomes blocked below it. This is temperature/phase context for MM02 Fig. 9. No universal temperature-independent viscosity or current 0.001 point follows. Quoted SOPC viscosity comes from earlier work, not new SOPC observations.

**Unit of observation:** Bead motion on vesicles at specified temperature and phase

**Anchor/access:** Abstract; Materials and Methods pp341–342; membrane-viscosity temperature results. Full author-hosted primary PDF.

### MM05 — Brownian motion in biological membranes

[10.1073/pnas.72.8.3111](https://doi.org/10.1073/pnas.72.8.3111) · primary_theory · SE413: paired UID/DOI audit OK, identity only.

Einstein relation links mobility and diffusion at a temperature. Mapping to viscosity also needs probe geometry, solvent viscosity and an applicable hydrodynamic approximation. No independent observation of current lipid self-D=1 um^2/s or viscosity=0.001 pN.s/um. Protein-inclusion continuum assumptions cannot silently be applied to a single lipid.

**Unit of observation:** Predicted inclusion mobility; empirical tracer comparisons cite earlier experiments

**Anchor/access:** Eqs. 2, 5, 8, 10; pp3111–3113; outer-liquid viscosity discussion. Full primary PDF from university host.

### MM06 — Determining the Gaussian curvature modulus of lipid membranes in simulations

[10.1016/j.bpj.2012.02.013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3309410/) · primary_simulation_and_theory · Unregistered in the saved KB; candidate ineligible.

Table 2 ratios -kappa_bar/kappa span 0.86–1.05. Table 1 earlier apparent egg-lecithin bilayer value is 0.83±0.12; many entries are monolayers. Uniform Gaussian energy invariance requires fixed topology and boundary. Current -0.8 is not a unique Hu bilayer measurement. Gaussian modulus combines closing-probability fit with bending modulus, edge tension and area. Monolayer/bilayer and symmetry assumptions cannot be removed.

**Unit of observation:** Repeated disk-closing simulations per initial curvature; Table 1 compiles earlier experimental/simulation results

**Anchor/access:** Eq. 1 and Gauss–Bonnet paragraph; Eqs. 2–4; Tables 1–2; Eq. 5. Full primary PMC article including equations/tables.

### MM07 — Structure of fully hydrated fluid phase lipid bilayers with monounsaturated chains

[10.1007/s00232-005-7006-8](https://lipid.phys.cmu.edu/papers05/JMBUnsat-05.pdf) · primary_structural_model_reinspection · Unregistered in the saved KB; candidate ineligible.

POPC 68.3±1.5 angstrom^2 supports a nearby rounded 70 angstrom^2 generic example. Model/sample uncertainty discussed; ±1.5 not promoted to SD/SEM/CI. 50–80 angstrom^2 exploratory range is not the source interval. Both-leaflet 2/a count requires matched leaflet/projected areas. P14 is the same study, not independent evidence.

**Unit of observation:** Composition-specific structural estimate jointly constrained by scattering and volume

**Anchor/access:** Abstract; Table 1 p198; Fig. 3; structural-analysis and uncertainty discussion. Full author-hosted primary PDF.

### MM08 — Dynamic tension spectroscopy and strength of biomembranes

[10.1016/S0006-3495(03)74658-X](https://heinrichlab.bme.ucdavis.edu/files/2010/11/2003_Evans_etal_BiophysJ.pdf) · primary_experiment · Unregistered in the saved KB; candidate ineligible.

Rupture-tension distributions depend on loading rate over 0.01–100 mN/m/s. Exact 3–5% areal-strain anchor was not located. Table 1 parameters come from kinetic-model fits. No universal strain threshold or probability band follows. Fig. 7 compares prior Rawicz bending/thickness by composition, not same-vesicle pairs. Preparation temperature is not assay temperature.

**Unit of observation:** One terminal rupture per vesicle; distributions across vesicles at each loading rate

**Anchor/access:** Methods pp2343–2344; Figs. 3–4 rupture distributions/spectra; Table 1 kinetic fits; Fig. 7 prior bending comparison. Full author-hosted primary PDF.

### MM09 — Cell membranes resist flow

[10.1016/j.cell.2018.09.054](https://cohenweb.rc.fas.harvard.edu/Publications/Shi_Cell_CellMembraneResistFlow_2018.pdf) · primary_cell_assay_reinspection · Unregistered in the saved KB; candidate ineligible.

Cell/tether protein D are 0.037±0.005/0.76±0.08 um^2/s, mean±SEM, n=10 pairs. Two model fits yield viscosity (3.0±0.4)e-3 pN.s/um and immobile area fraction 0.18±0.03. Derived tension diffusivity uses effective modulus 40 pN/um and obstacle-size assumptions. That modulus is not pure-bilayer current KA=200000 pN/um. P15 is same-study history.

**Unit of observation:** 10 tether/cell FRAP pairs for quoted DRD2 comparison; original-source fit, not current-input pairing

**Anchor/access:** Results hydrodynamic model; Fig. 2C; Quantification and Statistical Analysis; Eqs. S4–S9. Full author-hosted primary PDF; separate Table S2/raw paired records not acquired.

## Conditional relationships

These are source-comparison relationships, not current numerical fits, causal edges, covariance estimates or neural-network labels.

| Relation | What must stay conditional |
|---|---|
| MR01: area modulus, bending and rupture | Direct molecular strain requires an area reference and correction for thermal undulations. Evans rupture distributions additionally require the loading history. No rupture strain is calculated from mixed-source constants. |
| MR02: viscosity and diffusion | Einstein mobility applies to a defined equilibrium tracer; hydrodynamic inversion needs probe size, membrane/solvent geometry, temperature and boundary conditions. Surface viscosity has units Pa·s·m; a bulk value needs a thickness definition. |
| MR03: Gaussian rigidity | Hu fits disk-closing probability and combines it with other simulated quantities. Fixed topology alone does not make Gaussian energy constant: the boundary and uniform-modulus assumptions matter. |
| MR04: molecular area and areal mass | For matched leaflet/projected areas, two equal leaflets give 2/a molecules per projected area. A slab density-times-thickness calculation requires the same material region; hydration and protein mass cannot be mixed silently. |
| MR05: spontaneous curvature | Identical bilayer leaflets can cancel their preferred curvatures. The source uses total curvature c1+c2; a mean-curvature convention changes coefficient mapping. Zero remains an example, not a measured cell property. |
| MR06: cell transport | Shi combines paired protein-tracer fits with an effective area modulus and obstacle assumptions. Its 40 pN/um effective modulus is not current pure-bilayer K_A=200000 pN/um. |
| MR07: thermal-energy shorthand | A kBT multiplier needs a reference temperature. The historical 20 kBT convention is unresolved; no temperature scaling is applied to current energy. |

## Source conditions and uncertainty

- Rawicz: 12 fluid PC compositions, micropipette expansion. This pass recovered the primary abstract but not the PDF; assay temperature and per-composition table details remain open. The earlier Table 1/Methods reference is a pinned historical review. The less-than-±10% spread is across compositions, not an assigned SEM/SD/CI.
- Dimova 1999: SOPC giant vesicles at room temperature; finite-size bead/vesicle geometry and rotation affect inversion. Approximately ±30% is reported estimation error. Dimova 2000 adds DMPC phase/temperature dependence; its 30 °C electroformation condition is preparation.
- Kucerka: pure hydrated PC bilayers at 30 °C, X-ray/volume structural modeling. POPC ±1.5 Å² is retained as reported; current exploratory 50–80 Å² is not the paper confidence interval.
- Evans: one rupture per vesicle under a specified tension ramp. The 37 °C preparation condition is not established assay temperature. The 3–5% strain citation remains unlocated; no claim that the number is false.
- Shi: HeLa cell/tether pairs at 37 °C; the quoted DRD2 tracer diffusion uncertainties are SEM for 10 pairs. Inferred viscosity/obstacle uncertainties remain as reported, without importing an uncertainty family.

## Provenance and remaining acquisition gaps

Rawicz SE211 and Saffman SE413 have paired saved UID/DOI audits marked OK. This is bibliographic identity only. Other cards have no registered DOI match in the frozen export. All matching identities and audits, including duplicates if present, are retained in JSON. No registry edits were made.

Historical records P14, P15, SOURCED membrane.kappa_bend and uncertainty membrane.lysis_strain are pinned to commit `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09`, with full Git object/blob IDs, file hashes, record hashes and immutable snapshots in JSON. P13 is outside this scope and is excluded.

No raw observation tables were acquired. Shi reports paired experiments, but the raw pair IDs/values and separate Table S2 were not recovered. Those records would need tracer, bleaching geometry and fitting metadata before a paired-learning dataset could be proposed. Evans needs per-vesicle tension histories and censoring; viscosity assays need probe geometry, phase and temperature. Review summaries and repeated paper citations do not add samples.

Primary full text and extraction caches are ignored local files, not distributed review artifacts. Rawicz BioC returned an HTML error despite an XML path; it is explicitly excluded from evidence. The versionable retrieval metadata records successful and failed attempts.

JSON preserves exact atlas declarations, priors, source anchors, raw selected rows, KB comparisons, source-unit records, conditional assumptions and file hashes. Validation checks these against the frozen atlas and KB; this is host metadata validation, not simulation or scientific verification.


독립 재검토 보강: MM07의 POPC는 nominal POPC로 표현합니다. 원문 Methods p194·Discussion p200은 두 시료에 약 5%/25% acyl migration, 한 시료에 2–5% lysolecithin을 보고하고, 시료 간 면적 차이를 약 ±1 Å²로 설명합니다. 68.3±1.5 Å² 수치는 유지하며 이를 SD·SEM·CI로 지정하지 않습니다. MM08/MM09의 관측 단위·오차 종류는 재확인했고, MM09 개별 pair 원자료/Table S2는 아직 미확인입니다.
