# Protrusion and substrate geometry: bounded primary-source review

Advisory source comparison for the frozen `24b3a44cbd33dd34cde338483be19638aec1be1c` atlas. The 18 declarations and their complete priors are preserved: **12 EXAMPLE, 2 SOURCED, 4 SWEPT**. Eight source cards, seven conditional relations and six static code spans add observation definitions and provenance. No parameter, tag, source audit, PI preparation decision, model, prior or training label changed; no physics or learning ran.

The strongest located numerical match is the **±35° orientation mode in steady-state zebrafish keratocytes**, with zero defined normal to the leading membrane. It is neither a universal cell-state value nor an internal branch-angle distribution. Exact 8 nm fascin spacing and the cited 0.5–1.4 µm stress-fiber band remain unlocated in the inspected main papers.

## Current declarations and observational meaning

Values below are the existing inputs, not recommendations or newly estimated parameters. All 18 rows remain ineligible for training; current fit groups are empty and covariance is null.

| Input | Current value / tag | Source comparison |
|---|---|---|
| `filopodium.cap_angle` | 60.0 deg / EXAMPLE | Bundle-orientation cap half-angle; no exact target polarization measurement located. |
| `filopodium.contour` | 3.0 um / EXAMPLE | Built chain contour; membrane protrusion length can exclude a splayed root. |
| `filopodium.count` | 0 1 / SWEPT | Bundles per built cell. Zero and the [0,50] sweep are preserved PI choices, not a source census. |
| `filopodium.filaments` | 20 1 / EXAMPLE | Strands per bundle; 20 and the declared 10–30 architecture band remain uncalibrated here. |
| `filopodium.spacing` | 0.008 um / SOURCED | Hexagonal centerline spacing. Courson supports orientation selection; exact 8 nm remains unlocated. |
| `filopodium.tip_clearance` | 0.25 um / EXAMPLE | Ideal bundle-axis tip clearance; finite lateral offsets affect actual membrane distance. |
| `lamellipodium.contour` | 1.0 um / EXAMPLE | Chain contour also enters footprint dimensions; no exact source calibration located. |
| `lamellipodium.mode_angle` | 35.0 deg / SOURCED | Mueller ±35° mode is located in its source state. Faessler structural branch angle is a different observable. |
| `lamellipodium.n_filaments` | 0 1 / SWEPT | Total chains, not branches or protrusions. Zero and [0,200] remain PI/architecture choices. |
| `sf_arc.filaments` | 0 1 / SWEPT | Strands per arc, not number of arcs. Zero and [0,20] remain unchanged. |
| `sf_arc.lift` | 0.4 um / EXAMPLE | Arc-plane height above the basal plane; exact source value unlocated. |
| `sf_arc.pitch` | 0.6 um / EXAMPLE | Radial spacing between built concentric arcs; exact source value unlocated. |
| `stress_fiber.filaments` | 0 1 / SWEPT | Strands per bundle; bundle number derives separately from basal geometry and pitch. |
| `stress_fiber.pitch` | 0.5 um / EXAMPLE | Lateral bundle-axis pitch, distinct from strand packing and longitudinal periodicity. |
| `stress_fiber.sarcomere` | 1.0 um / EXAMPLE | Recorded only; the builder places no periodic stations. Exact cited 0.5–1.4 µm band unlocated. |
| `stress_fiber.spacing` | 0.012 um / EXAMPLE | Strand centerline packing, distinct from inter-bundle pitch and protein-band repeat. |
| `substrate.stiffness` | 5000.0 pN/um^2 / EXAMPLE | Modulus units: 5000 pN/µm² = 5 kPa. Declared absent in this suspended specimen. |
| `substrate.thickness` | 50.0 um / EXAMPLE | External layer thickness. A universal below-10-µm-only correction rule is unsupported. |

## Primary cards

**PG01 — Courson and Rock 2010.** [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC2924060/), Fig. 1, Fig. 3 and Experimental Procedures. Optical manipulation of phalloidin-stabilized actin with human fascin or chicken smooth-muscle α-actinin demonstrates orientation-dependent binding. It does not supply a located 8 nm centerline spacing measurement. Room temperature is stated for bead preparation; a numeric mechanical-assay temperature was not identified. This is the same paper already present in AO04, not an independent new study. DOI is unregistered in the saved KB.

**PG02 — Svitkina 2003.** [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC2172658/), Figs. 5–6 and Methods. B16F1 mouse melanoma cells on laminin were studied by live imaging at 36–37°C and correlative platinum-replica EM. Splayed bundle roots distinguish whole-filament extent from membrane-defined protrusion length. The authors limit their convergent-elongation interpretation to the studied context and leave other mechanisms open. Representative images do not establish the current 3 µm contour, 20 strands, 60° cap or 0.25 µm clearance. DOI is unregistered.

**PG03 — Mueller 2017.** [Official publisher issue PDF](https://cell-171-1.elsevierdigitaledition.com/main/files/assets/common/downloads_e5cd3703/publication.pdf), article printed pp. 188–200; p. 192 discusses Fig. S4B. Adult zebrafish keratocytes migrated on serum-coated planar coverslips. Filament orientations peak at ±35° relative to the leading-membrane normal in steady migration, and change with load. This source mode is not the same quantity as the internal approximately 70° branch angle. Only the main article was inspected here; online STAR Methods, supplemental figures and a numeric imaging temperature were not independently acquired. SE94 is paired identity-OK.

**PG04 — Faessler 2020.** [Primary article](https://www.nature.com/articles/s41467-020-20286-x), Results/Fig. 1 and angle-calculation Methods. Rac1Q61L-expressing mouse NIH-3T3 cells on fibronectin were extracted with detergent/phalloidin and fixed before cryo-ET. A fitted structure from 14,296 subtomograms gives a 71° mother–daughter axis angle. The 9 Å resolution is not an angular SD, and subtomograms are not independent cells. This Nature Communications DOI is a new unregistered candidate. The saved `Fassler` alias with EMBO DOI `10.15252/embj.2019104254`, SE335 and DOI_DEAD remains separate; its 68±9° description is not adopted or silently repaired.

**PG05 — Hotulainen and Lappalainen 2006.** [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC2063839/), Figs. 3E and 5; Methods. Human U2OS cells on fibronectin were imaged at 37°C. The source distinguishes ventral fibers attached at both ends, dorsal fibers at one end and transverse arcs without direct terminal focal adhesions. It describes evolving α-actinin/myosin periodicity. An exact 0.5–1.4 µm band, current bundle pitches/lift, 12 nm strand spacing and 20-strand census were not located as quantitative measurements. A biological pattern does not populate the current builder’s zero periodic stations. SE436 is paired identity-OK.

**PG06 — Tinevez 2009.** [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC2765453/), Fig. 1 and Cell Preparation Methods. Detached mouse L929 cells were kept in PEG-coated dishes to prevent readhesion and studied with laser ablation and micropipette aspiration. This supports the selected suspended preparation and cortex/bleb response. It is not a complete census proving zero filopodia, lamellipodia, stress fibers and arcs in MCF7 or all suspended cells, nor proof of a universal adhesive-substrate requirement for filopodia. Current zeros and sweep endpoints remain PI choices. Main-article access did not establish numeric assay temperature. SE3 is paired identity-OK.

**PG07 — Merkel 2007.** [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC2025665/), layer theory and Discussion. The source studies silicone films bonded to glass, microneedle tests and embryonic rat cardiac fibroblasts. Its formulations have reported Young moduli 16/38 kPa and Poisson ratio 0.50, distinct from the declared PAA-like material. Finite-layer response depends on distance/thickness, material and support conditions. The discussion gives approximately 60 µm as a half-space adequacy scale under its imaging conditions and 5–10 µm films for improved localization; neither is universal. It does not jointly source the current 5 kPa/50 µm pair. DOI is unregistered.

**PG08 — Pelham and Wang 1997.** [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC28362/), Fig. 1 and Methods. NRK and 3T3 cells were cultured on collagen-coated PAA sheets approximately 40 µm thick. The article separately measures bulk stress/strain Young modulus in N/m² and local microneedle force/displacement in N/µm. Mapping these requires geometry. The current 5 kPa conversion is dimensionally correct, but this paper does not establish the exact 5 kPa/50 µm pair or an intrinsic MCF7 property. A staining wash temperature does not supply live-assay temperature. SE358 is paired identity-OK.

## Conditional relationships and their limits

- Filopodial total chain count is bundle count × strands per bundle. Bundle cap angle, chain contour and lateral centerline spacing refer to separate coordinates.
- Under the current spherical placement formulas, root radius is cell radius minus clearance minus contour; the bundle-axis tip is cell radius minus clearance. This does not guarantee identical clearance for all laterally offset tips.
- A symmetric half-branch-angle construction can yield ±35°, but the current lamellipodium builder places alternating straight chains and explicitly has no mother–daughter junctions. Orientation alone does not establish branching or mechanical attachment.
- Stress-fiber and arc strand counts are per bundle. Their number and extent depend on basal width, pitch, lift and packing. Co-location does not establish the source paper’s physical attachments.
- The sarcomere input is stored as metadata with `n_stations_placed=0`; observed source protein periodicity cannot be treated as current periodic structure.
- Substrate modulus and thickness participate in a source elastic boundary problem together with Poisson ratio, support and load geometry. This is a source comparison only; the frozen atlas marks both substrate rows declared absent.

These are static definitions or source-conditioned relationships. They add no current same-fit membership, covariance, causal edge or latent-parameter label. No raw joint observation table was obtained.

## Provenance and remaining gaps

JSON retains exact raw declarations, prior rows/locations, source-row/audit snapshots and anchors. Six historical example groups, two historical SOURCED reviews and one uncertainty row are pinned to immutable `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` file bytes and object hashes. AO04 is pinned to its existing committed snapshot so Courson reinspection is not counted independently. Source identity OK is bibliographic identity only.

All raw pages and extracted text remain ignored local caches. The publisher URL returned an entire 282-page issue; only the Mueller article, PDF pages 206–218, was inspected. That issue PDF is local-only and is not shipped. Versionable retrieval metadata records all file sizes and SHA-256 values.

Open items are the exact primary chain for 8 nm and the 0.5–1.4 µm band; target-cell bundle/filament census and geometry definitions; candidate Faessler bibliography adjudication; and an explicitly defined external material/force geometry if an adherent preparation is later chosen. Unlocated support does not prove a value false.

Host-only checks confirmed 18 exact declaration/prior pairs, 8 cards, 10 immutable history objects, 7 relations, 8 source-estimation groups, 6 code spans and 17 local cache records. Source/file/span hashes and reference closure were checked. No simulation, native verifier or training was run.

JSON SHA-256: `8f2adaa4efa66602f4dda61c378d9097c59731500b70ede386e40eaf96991f99`

Retrieval metadata SHA-256: `7d5177932b618b51bbf17cb19e2e6ed75b686d9833006534a178335c4ae7d695`
