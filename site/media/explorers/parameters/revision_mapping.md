# Cross-revision parameter meaning review

Codex advisory static source/metadata audit; not verification authority, an approved model decision, source upgrade, or biological evidence.

Frozen atlas: 24b3a44cbd33dd34cde338483be19638aec1be1c (706 rows). Live root: 2a5111cf47429ebab2fed5ede41866e1bd53df70, read at 2026-09-28T18:44:46.468287+00:00. The live canonical spec is byte-identical to the atlas; no aleph/cell or aleph/physics path changed between them. The frozen atlas was not rebuilt.

Archived source commits e097d4dca, a33d29a0f and 1f04609db share the same 728-row canonical spec: 31 additions, 9 removals and 9 changed common declarations relative to the atlas. They are divergent branch revisions, not linear successors of the frozen atlas. The 929ca0c25 source has 706 rows and two source-text differences. Full ancestry, hashes and field-level changes are in the JSON.

No pure rename or automatic cross-version equality was established. The 18 semantic cards distinguish code arithmetic, model replacement, changed role, stale prose and unresolved meaning.

## cortex_population_replacement: One contour population becomes two length-density populations

Classification: non_equivalent_replacement. Parameters: cortex.areal_density, cortex.contour, cortex.length_density, cortex.formin_mass_fraction, cortex.formin_length, cortex.arp23_length, cortex.seg.

- Base: A=4*pi*r_shell^2; N=round(areal_density*A); one contour=cortex.contour.
- Branch: N_formin=round(length_density*f*A/formin_length); N_arp23=round(length_density*(1-f)*A/arp23_length), f=formin_mass_fraction.
- Old areal_density [1/um^2] * contour [um] gives a nominal length density [1/um]; that arithmetic is not network equality.

Units: filament counts: 1; length density: 1/um.

- No one-to-one rename: rounding, length distribution, population count and topology differ. The old two inputs cannot be uniquely recovered from length density.
- The output range cortex becomes formin only; its old meaning covered the original single population.
- New SOURCED tags are historical declarations, not newly accepted literature or demonstrated specimen transfer.

Code evidence: 24b3a44cbd33dd34cde338483be19638aec1be1c:aleph/cell/build/cortex.py:180-194; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:44-52; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:337-356; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:137-142; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:155-160.

## arp23_fraction_quantity: Fraction scope changes and branch source prose conflicts with construction

Classification: same_name_changed_scope_and_declaration_code_conflict. Parameters: cortex.arp23_fraction, cortex.formin_mass_fraction, cortex.formin_length, cortex.arp23_length, arp23.branch_angle.

- Base fraction is applied to single-population daughter counts.
- With formin present: want=N_arp23-round(fraction*N_arp23); generation1=min(want,N_formin*(nodes_per_formin-1)); remaining Arp2/3 chains enter later rooted generations.
- Without formin: within-part daughter_junctions fallback.

Units: junction/count fractions: 1.

- Branch source prose says not rooted on formin; code roots trees on formin when mothers exist. Preserve the conflict.
- Constructed filament-count fraction, polymer mass fraction and fluorescence contribution are distinct quantities; no conversion is inferred, especially with different contour lengths.
- Pinned independent example_review P06 records F-actin fluorescence contribution, not direct daughter-filament count. R02 flags the denominator transfer. It remains advisory and requires lengths, sampling and perturbation assumptions; no conversion or new paper adjudication here.

Code evidence: 24b3a44cbd33dd34cde338483be19638aec1be1c:aleph/cell/build/cortex.py:189-194; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:196-228; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:249-267; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:382-396; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:2632-2637.

## cortex_constructed_chord: Declared seg can differ from a constructed short-filament chord

Classification: context_dependent_construction_quantity. Parameters: cortex.seg, cortex.formin_length, cortex.arp23_length.

- s=cortex.seg if contour>=2*cortex.seg else contour/2; chord=contour/round(contour/s).
- For contour 0.12 um and seg 0.05 um, source arithmetic gives chord 0.06 um.

Units: um.

- No build or measurement executed.
- meta.chord_um records the discrepancy; clearance and later growth are separate geometry changes.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:359-376; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/cortex.py:421-423.

## association_rate_derivation: Bimolecular association replaces a typed per-site rate

Classification: non_equivalent_replacement_with_qualified_derivation. Parameters: crosslink.k_on, filamin.k_on, crosslink.k_plus, filamin.k_plus, crosslink.k, filamin.k, crosslink.length, filamin.length, cell.temperature.

- sigma2=kBT/k; Z=4*pi*sqrt(2*pi*sigma2)*(L0^2+sigma2) [um^3]; k_on_site=k_plus/(602.214076*Z).
- Inputs: k_plus [1/(uM.s)], k [pN/um], L0 [um], kBT [pN.um]; conversion 602.214076 molecules/(um^3.uM).
- Molecular-arm path passes k_arm=2*k_whole and L_arm=L_whole/2.

Units: 1/s.

- Gaussian-shell approximation requires sigma much smaller than L0; not an exact arbitrary-tether partition integral.
- kBT<=0 is refused for k_plus. If k_plus is absent, legacy k_on is read.
- Per-site candidate weighting, site multiplicity and molecular representation matter. No direct unit conversion/equality to old k_on. Whole-relation and molecular-arm rates differ.

Code evidence: 24b3a44cbd33dd34cde338483be19638aec1be1c:aleph/cell/bonds.py:118-127; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:84-117; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:181-193; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/crosslinkers.py:161-169.

## transition_rate_placeholder: attach.rate changes from binding to zero placeholder

Classification: same_name_changed_declaration_role. Parameters: crosslink.attach.rate, filamin.attach.rate, crosslink.k_on, filamin.k_on, crosslink.k_plus, filamin.k_plus.

- Base attach.rate is bound to corresponding k_on. Branch attach.rate is literal 0 EXAMPLE while the binder uses _attach_rate(prefix).

Units: 1/s.

- Zero placeholder is not zero attachment or an ablation.
- Entry metadata validation is distinct from kinetic use.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:1270-1275; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:2855-2860; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:181-193; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/language.py:990-1012.

## kinetic_source_pairing: Unchanged kinetic values acquire explicit fit-pairing cautions

Classification: source_metadata_change_not_value_or_source_upgrade. Parameters: crosslink.k_off0, filamin.k_off0, filamin.x_beta, crosslink.k_plus, filamin.k_catch0, filamin.x_catch.

- Values, units and tags of the three changed common rows stay fixed; source strings add pairing/non-closure cautions.
- With both catch and slip exit edges active, zero-load total off-rate is their sum, not filamin.k_off0 alone.

Units: off-rate: 1/s; Bell length: um.

- Source strings flag a single-bond/bulk pairing mismatch and combined filamin fits pending a model decision. Historical claims are preserved, not newly adjudicated.
- No source upgrade or replacement fit is authorized.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:776-781; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:1906-1911; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:1912-1917; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:254-295.

## pressure_replaced_by_laplace: Typed pressure becomes a tension/radius reference balance

Classification: non_equivalent_replacement_with_model_derived_quantity. Parameters: membrane.pressure, envelope.pressure, envelope_inner.pressure, membrane.tension, envelope.tension, envelope_inner.tension, cell.radius, cell.nc_ratio, envelope.spacing, osmotic.water_permeation.

- p0=2*tension/R; if water permeation enabled, surface p0=0.
- R_membrane=cell.radius; R_envelope=cell.radius*cell.nc_ratio; R_inner=R_envelope-envelope.spacing.

Units: pN/um^2.

- Reference-radius model arithmetic, not measured pressure or exact local balance on arbitrary wrinkles.
- Removed pressure keys survive in run templates but these branch builders do not read them.
- Osmotic pressure is separate when transport is on; surface p0=0 does not mean zero total pressure.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/envelope.py:26-34; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/envelope.py:100-106; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/envelope.py:161-170; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/membrane.py:50-64.

## concentration_balance: Internal concentrations become derived initial pool conditions

Classification: non_equivalent_replacement_and_declaration_code_conflict. Parameters: osmotic.internal, osmotic.nucleoplasm, osmotic.external, cell.temperature, membrane.tension, envelope.tension, cell.radius, cell.nc_ratio, osmotic.water_permeation.

- c_cytosol=c_bath+laplace_turgor(membrane)/(kBT*602214.076); c_nucleus=c_cytosol+laplace_turgor(envelope)/(kBT*602214.076) if envelope exists.
- Conversion 602214.076 molecules/(um^3.mM); initial counts subsequently multiply by compartment water volume.

Units: mM.

- osmotic.external prose says nucleus equals cytosol; code adds envelope turgor. Preserve conflict.
- Retired internal/nucleoplasm keys can remain in templates without use by this helper.
- Initialisation is not observed concentration or active-cell equilibrium proof.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/transport_build.py:161-189; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/transport_build.py:239-258; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/spec.example.toml:2302-2307.

## dynein_role_change: Same dynein rows change the non-cargo motor owner

Classification: same_name_changed_mechanistic_role. Parameters: dynein.count, transport.dynein_cargo_fraction, kinesin.count, transport.kinesin_cargo_fraction.

- N_cargo=round(total*cargo_fraction) when cargo.radius exists; N_rest=total-N_cargo.
- Base non-cargo owner=microtubule; branch dynein owner=cortex while kinesin remains microtubule.

Units: counts: 1.

- Same values/rates need not produce same mechanical action.
- Function introductory prose still describes sliding; the implemented rest_owner changes dynein to cortex.
- Actual populations and options required; presence does not prove observed role.

Code evidence: 24b3a44cbd33dd34cde338483be19638aec1be1c:aleph/cell/bonds.py:436-450; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:518-534.

## thermal_initial_attachment: Build policy changes occupancy while nominal counts can remain fixed

Classification: new_construction_policy_input. Parameters: build.thermal_attach, cell.temperature, crosslink.k_plus, filamin.k_plus, crosslink.k, filamin.k, crosslink.length, filamin.length, crosslink.reach, filamin.reach.

- Candidate weight=exp[-k*(d-L0)^2/(2*kBT)]; selected partner strain scales attach edges before stationary-state draw.
- Two-state example: P(bound)=k_on*weight/(k_on*weight+k_off).

Units: probability/count: 1.

- Conditional on switch and fixed-rest path, not universal initialization.
- No partner, same-chain exclusion and vanishing numerical weights can leave a slot free.
- Fixed nominal count does not fix bound count or prestress; no equilibrium measurement follows.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:1165-1174; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:1275-1290; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:1305-1325; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:1425-1474.

## material_binding_sites: Site periods and sharing change the binding space

Classification: new_parameter_family_non_equivalent_geometry. Parameters: crosslink.site_period, crosslink.site_group, crosslink.site_exclusion, filamin.site_period, filamin.site_group, filamin.site_exclusion.

- site_period [um] selects material sites; absent row retains node-anchored kind.
- Equal site_group>0 declares shared lattice; site_exclusion [um] is axial footprint half-width.

Units: period/exclusion: um; group: 1.

- Equal separately declared values are not bindings or empirical covariance.
- Dynamic helper reads are missed by literal-only extraction.
- Per-site comparisons require site construction and weighting.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:149-178; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:181-193.

## contact_geometry: Exclusion radii and sheet thickness differ from drag radii

Classification: new_geometry_and_solver_inputs. Parameters: chromatin.exclusion_radius, crosslink.exclusion_radius, filamin.exclusion_radius, membrane.channel.exclusion_radius, membrane.half_thickness, envelope_inner.half_thickness, contact.d_hat, contact.kappa, contact.sdf.eta, contact.sdf.refit_every, contact.barrier.safety, contact.barrier.headroom, material.if.radius, if.gap.

- Barrier d=distance(node,closest surface point)-node_exclusion_radius-surface_half_thickness.
- Single-sheet envelope half-thickness=spacing/2+membrane.half_thickness. Double sheet outer uses membrane.half_thickness; inner reads own half_thickness.

Units: distance: um; kappa: pN/um; safety/eta/headroom/counts: 1.

- Range and sheet/instrument identity matter; not a rename of drag radius.
- contact.d_hat presence selects build clearance. Same IF gap/material inputs can produce changed realised geometry.
- Geometry, solver safety and cadence are different roles, not sourced biological covariance. No IF constitutive-model choice/validation made here.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/exclusion.py:47-58; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/exclusion.py:106-138; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/clearance.py:50-57; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/intermediate_filament.py:133-148; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/physics/energy/sdf.py:3-9; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/contact_core.py:86-95.

## aster_attachment_geometry: Aster coefficients depend on realised geometry

Classification: new_input_with_geometry_dependent_derivation. Parameters: microtubule.mtoc_clearance, microtubule.hub_angular_stiffness, centrosome.nucleus_k, microtubule.mtoc_radius, microtubule.seg.

- k_relation=k_theta/median(K_arm); K_arm=sum(0.5*rho_bead^2*|tangential_relation_direction|^2) at unit coefficient.
- Nucleus k_per_relation=centrosome.nucleus_k/N_footprint_vertices, nearest-vertex fallback if empty.
- MTOC clearance uses explicit row if present, else realised microtubule step.

Units: k_theta: pN.um; per-relation k: pN/um; clearance: um.

- Median-arm normalization is not exact equality for every arm.
- centrosome.nucleus_k is total coefficient, not per-constituent value.
- Clearance is not an alias of declared segment length.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/microtubule.py:156-178; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:1557-1592; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:1595-1612.

## clutch_rate_scope: Clutch geometry changes while rate normalization remains unresolved

Classification: new_geometry_with_unresolved_rate_semantics. Parameters: clutch.length, clutch.k_on, membrane.half_thickness, substrate.gap, substrate.mesh, substrate.ligand_density, substrate.enabled.

- Rest=clutch.length+2*membrane.half_thickness+substrate.gap.
- Ligand period=2/(sqrt(3)*substrate.mesh*substrate.ligand_density).

Units: length/period: um.

- Code states per-clutch cited k_on is used per site; conversion remains unresolved. Do not invent one.
- Required substrate rows absent from canonical branch spec; path conditional on substrate.enabled.
- Retained clutch rows do not establish active adhesion in suspended/unit inputs.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:980-982; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/bonds.py:995-1022.

## fluid_box_and_fast_modes: Computational inputs require actual options and grid metadata

Classification: new_runtime_or_discretisation_inputs. Parameters: fluid.box_per_axis, fluid.box_cells, fluid.cells_multiple, fluid.dx, fluid.padding, fluid.staggered, fluid.open_boundary, sim.fast_mode_iters.

- Axis span=max(position)-min(position)+2*padding; cells=ceil(span/dx) rounded up to cells_multiple; excess split evenly; staggered uses lcm(cells_multiple,16).
- box_per_axis=1 conflicts with nonzero box_cells; fast_mode_iters read only if opts.fast_modes.

Units: grid: um; cell/iteration counts: 1.

- Built positions and instruments determine box, not cell radius alone.
- MINI omits canonical fluid.box_per_axis and sim.fast_mode_iters. Missing is not globally zero; path-specific branches matter.
- open_boundary requires an actually constructed fluid path; row presence does not prove fluid activation.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/assemble.py:333-347; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/assemble.py:370-387; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/assemble.py:1348-1357; 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/application/core.py:481-484.

## unit_selection: Whole-cell rows can be retained in a compartment-only build

Classification: new_scenario_selector_not_full_cell_evidence. Parameters: standard.nucleus_layer.enabled, standard.cortex_layer.enabled, crosslink.k_off0.

- Nucleus unit: envelope, envelope_inner, lamina, chromatin, IF. Cortex unit: cortex, cortex_arp23, membrane, NMII.
- U2X0 overrides crosslink.k_off0=0; snapshot keeps SOURCED tag and the bound detach.rate value also changes.

Units: selector: 1; off-rate: 1/s.

- Helpers explicitly label development units; no whole-cell physical conclusion.
- Retained rows do not activate missing compartments; join realised ranges.
- U2X0 is an intervention with invalid/no-step status, not sourced zero dissociation. Exact override evidence remains in run mapping and prior review.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/cell/build/standard.py:91-127; 1f04609db309389789d31b44c70ae93d31fd6df8:dev/experiments/qs_active_native.py:589-592; 1f04609db309389789d31b44c70ae93d31fd6df8:dev/experiments/qs_active_native.py:728-739.

## surface_count_source_correction: Source correction does not prove a changed limiter

Classification: source_metadata_clarification. Parameters: sim.inplane_count_floor_fraction, sim.inplane_flow_cg_iters.

- Code at 929: allowance=min(1,room/outflow); edge flux multiplied by donor allowance.
- 929 wording mentions global scaling; base wording describes donor/edge behavior.

Units: fraction/iteration counts: 1.

- Both inspected versions already implement donor-edge limiting. Do not infer a global-to-local dynamics change from source text.
- Revisions are divergent branches, not upgrade ancestry; other code/report changes remain distinguished by hashes.

Code evidence: 929ca0c253f0cb34ede8740422585ea20887fa4f:aleph/physics/surface_count_flow.py:258-285; 24b3a44cbd33dd34cde338483be19638aec1be1c:aleph/physics/surface_count_flow.py:271-300.

## orphan_template_rows: Template rows can outlive their code consumer

Classification: retained_declaration_with_retired_or_unresolved_role. Parameters: contact.sdf.r_query, contact.barrier.swept_headroom, membrane.pressure, envelope.pressure, envelope_inner.pressure, osmotic.internal, osmotic.nucleoplasm.

- sdf.py documents deletion of refresh-time displacement budgets including contact.sdf.r_query.
- Bounded tracked-Python search excluding output trees at 1f finds no contact.barrier.swept_headroom occurrence and only retirement prose for contact.sdf.r_query.

Units: None.

- Negative lexical search does not prove complete dynamic-read absence.
- Pressure/concentration replacement meanings have their own cards; keep retained values in provenance without treating them as active force inputs.

Code evidence: 1f04609db309389789d31b44c70ae93d31fd6df8:aleph/physics/energy/sdf.py:22-24.

## Complete canonical declaration deltas

Added on the archived branch: build.thermal_attach, centrosome.nucleus_k, chromatin.exclusion_radius, clutch.length, contact.barrier.headroom, contact.barrier.safety, contact.d_hat, contact.kappa, contact.sdf.eta, contact.sdf.refit_every, cortex.arp23_length, cortex.formin_length, cortex.formin_mass_fraction, cortex.length_density, crosslink.exclusion_radius, crosslink.k_plus, crosslink.site_exclusion, crosslink.site_group, crosslink.site_period, envelope_inner.half_thickness, filamin.exclusion_radius, filamin.k_plus, filamin.site_exclusion, filamin.site_group, filamin.site_period, fluid.box_per_axis, membrane.channel.exclusion_radius, membrane.half_thickness, microtubule.hub_angular_stiffness, microtubule.mtoc_clearance, sim.fast_mode_iters.

Removed from its canonical spec: cortex.areal_density, cortex.contour, crosslink.k_on, envelope.pressure, envelope_inner.pressure, filamin.k_on, membrane.pressure, osmotic.internal, osmotic.nucleoplasm.

| Changed common row | Changed fields | Resolved base to branch | Unit |
|---|---|---|---|
| cortex.arp23_fraction | source | 0.5 to 0.5 | 1 |
| crosslink.attach.rate | bound, source, value | 10.0 to 0.0 | 1/s |
| crosslink.k_off0 | source | 0.066 to 0.066 | 1/s |
| envelope.tension | source | 6.0 to 6.0 | pN/um |
| filamin.attach.rate | bound, source, value | 1.0 to 0.0 | 1/s |
| filamin.k_off0 | source | 0.087 to 0.087 | 1/s |
| filamin.x_beta | source | 0.0004 to 0.0004 | um |
| membrane.tension | source | 10.0 to 10.0 | pN/um |
| osmotic.external | source | 300.0 to 300.0 | mM |

Every raw before/after declaration, including source, unit, range and binding, is retained in canonical_deltas. Tracked templates and effective run snapshots have separate complete deltas. Historical source strings are not newly approved citations.

## Six bounded records

| Record | Declared source | Rows | Status and limit |
|---|---|---:|---|
| native_4090_20260923 | 929ca0c253f0cb34ede8740422585ea20887fa4f | 773 | native_population; completed_six_steps_approximate_solver_not_validated |
| native_mv94_20260927 | e097d4dca5182f430bee7277b694d5ab82fb4e29 | 803 | native_labelled_construction_only; invalid_no_steps |
| mini_M100_20260929 | a33d29a0fb1cb60fc915790cc86778a72da95008 | 800 | mini_development; force_accepted_development_only |
| unit_U2X0_20260929 | 1f04609db309389789d31b44c70ae93d31fd6df8 | 801 | cortex_unit_development; invalid_infeasible_start_no_steps |
| unit_U1W100s2_20260929 | 1f04609db309389789d31b44c70ae93d31fd6df8 | 801 | nucleus_unit_development; six_ledger_steps_no_local_score |
| plate_mv_demo_20260928 | unresolved | 803 | mini_development_demo; source_unresolved_driver_end_unknown_scorer_invalid |

The completed native-population record used six steps with approximate solver options. The later native-labelled record has no steps. MINI and unit records remain development records; the plate demo lacks an authoritative source commit. None becomes an external biological observation through this mapping. Exact paths, JSON keys, runtime clocks and override evidence are linked to run_context_review.json.

The 4090 input is the schema union of its stamped 706-row canonical spec and 67-row instrument overlay, but enables instrument.plate.enabled and instrument.face.enabled. Declared load inputs do not prove that force was applied.

MINI templates retain removed pressure/concentration and contact-budget keys, while omitting fluid.box_per_axis and sim.fast_mode_iters from their branch canonical spec. Unit inputs select only a compartment subset. Presence must be joined to realised ranges and runtime options.

## Consumption boundary

- Identify a value by revision, input hash, key, quantity/unit, override provenance, active owner/compartment and solver context.
- Keep within-spec aliases, derived quantities, replacements, shared code use, source claims and empirical relations distinct.
- Separate template values, effective values, realised construction and observed output. Preserve runtime dt independently.
- Absent row, placeholder, inactive compartment, bypassed option, empty run and unobserved output are distinct. None means measured zero.
- Never promote inherited SOURCED tags on overrides or mini/unit/invalid/unstamped runs into native biological evidence.

Only tracked source and bounded TOML/JSON metadata were read. No physics, project runtime import or raw-array read. Literal AST sites are syntactic candidates; dynamic f-strings, maps, aliases and helpers remain explicit blind spots. Source hashes do not independently verify deployment.

The independent [example review](example_review.md) is pinned by SHA-256 in the JSON: group cortex_nucleator_fraction, primary card P06, relation R02, parameter cortex.arp23_fraction. It records the Bovellan fluorescence/count quantity mismatch and remains advisory, not PI adjudicated or eligible as a training label. The branch length-density split supplies no missing optical-to-count conversion.

Validation: all 706 frozen declarations and resolved values match their saved spec. Bindings resolve; canonical counts and the native overlay schema union were checked. All 31 additions, 9 removals and 9 changed common names have semantic cards. 425 git objects and 13 local metadata files are hashed.

Independent final check: all 425 git-object hashes, 13 local hashes and 66 code spans matched. Effective snapshot JSON pointers resolved and matched values; comparison counts matched their lists. Negative contact-row searches were repeated without executing project modules.

The source-review attachment JSON and Markdown hashes match the handoff. Its P06/R02/group/parameter pointers were checked and all 13 local metadata hashes were rechecked after attachment.

Dependency refresh: example_review JSON 749d52452558e5c2ee6d38fd9aee1f9ceae6946f02c264b0e970cb741a600fa9 and Markdown 34a44f6d4e0d635847e117c7194dc2d5f8f8d2897a3fe9c3dc16790ca02a2ec6. The bibliographic-only row-reference repair leaves the pinned cortex P06/R02 claim and eligibility unchanged; all local metadata hashes were rechecked.

Historical dependency note: the pinned EXAMPLE review version1 is recoverable from checkpoint5fddbbd17. JSON pointers and hashes refer to that captured object; the current version2 has later advisory refinements. No cross-version parameter equality is introduced.
