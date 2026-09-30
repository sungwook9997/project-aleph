# 형광 최솟값을 원본 측정 파일까지 추적

**첫 CAV1 취득 파일에서는 반복되는 형광 최솟값이 TSV 내보내기 전부터 RTDC 파일에 있습니다.** 공개 압축 파일의 첫 멤버만 입수해 기존 표본의 1,286행과 대조했습니다. 다른 날짜·mock 파일·전체 취득 소프트웨어의 처리 과정을 검증한 결과는 아닙니다.

[연구 그림 PNG](joint_observation_raw_lineage.png), [PDF](joint_observation_raw_lineage.pdf), [SVG](joint_observation_raw_lineage.svg), [정밀 기록](joint_observation_raw_review.json).

## 확인한 연결

| 확인 대상 | 결과 |
|---|---|
| 원본 멤버 | `20191219_06_pCGIT-Cav1_preinc - M1.rtdc`, 35,470,138바이트, CRC32 5877803 |
| 대응 표본 | 기존 CAV1 TSV의 1,286행과 같은 순서. 이 멤버에서 TSV로 빠진 행 0개 |
| 같은 이름의 scalar 열 20개 | TSV의 `%.10e` 출력 정밀도에서 모든 값과 비유한값 부호 일치 |
| event index | 이 파일에서는 저장 `index_online`과 export `index`가 모두 1–1,286. 전체 자료의 병합 파일에 일반화하지 않음 |
| `deform` | 저장 `circ`에서 float32 `1-circ`로 계산하면 전 행 일치. RTDC의 별도 `def`를 그대로 쓰면 71행만 일치 |
| 형광 최솟값 | RTDC의 float32 값 0.10000000149011612가 528행에서 반복. 같은 행의 TSV 값과 출력 정밀도에서 일치 |
| 온도 | RTDC의 `temp`도 전부 0. 실측 0°C라고 판단할 근거가 추가된 것은 아님 |

`emodulus`, `volume`, `tilt`, `inert_ratio_prnc`는 이 대조에서 재계산하지 않았습니다. RTDC라는 파일 형식이나 원자료라는 이름만으로 미처리 전압·무필터 취득 stream이라고 부르지 않습니다. 파일에는 영상, 처리된 scalar, `fl2_raw` 및 `fl2_median` 이름의 trace가 함께 저장돼 있습니다.

헤더에 기록된 dclab 0.18.0과 ShapeOut 0.9.8의 공식 코드 판독은 [별도 처리 경로 검토](JO01_PROCESSING_REVIEW.md)에 있습니다. `def`와 `deform`이 다른 키이며, 저장 `deform`이 없을 때 `1-circ`를 계산하는 경로와 이번 수치 일치가 서로 부합합니다. 패키지를 재실행해 당시 환경을 복원한 결과는 아닙니다.

최솟값의 원인을 단정하는 단순 설명도 검사했습니다. 각 이벤트의 전체 `fl2_median` trace 최댓값을 구해 0.1보다 작은 값만 올리면 1,014행이 맞고 **272행은 맞지 않습니다**. 따라서 이 규칙만으로 저장된 `fl2_max` 전체를 재현할 수 없습니다. peak 검출 구간·baseline·유효성 판정·기기 알고리즘은 여전히 미확인입니다. 이 실패를 검출한계나 검열 분포의 추정으로 바꾸지 않습니다.

## 원문 설명과 구분되는 파일 설정

파일 metadata에는 채널 폭 30, 총 유량 약 0.16, sample/sheath 유량 약 0.04/0.12, 영상 pixel size 약 0.34, 취득 소프트웨어 `2.1.0.0`, FL2 `561 nm`/`593/46`이 기록돼 있습니다. 단위의 해석은 해당 장치 형식과 논문을 함께 읽어야 하며 별도 재교정 결과가 아닙니다. 논문의 30 µm·0.16 µL/s 설명과 명목상 맞는 값이 실제 이 파일에도 있음을 확인한 범위입니다.

`online_filter`에는 면적 50–500 및 area ratio 1–약 1.05의 soft-limit 설정이 있습니다. 이 파일은 그 밖의 면적도 보존하므로 이 숫자를 적용 완료된 hard gate로 읽지 않습니다. 후속 저자 분석의 최종 집단이나 개발자의 Table6 부분 필터와도 구분합니다. 외부 개발자의 전체 자료는 9개 날짜이며 같은 날짜의 두 취득 session을 함께 분리하도록 계획됐습니다.

## 그림의 범위

첫 이벤트와 최솟값을 가진 첫 이벤트를 원본 순서로 선택했습니다. 영상은 원래 ROI 전체를 0–255 공통 회색 척도로, trace는 저장된 모든 sample을 공통 전체 y 범위로 표시합니다. 밝은 이벤트와 어두운 이벤트의 생물학적 비교를 설계한 것이 아닙니다. 세포 이미지나 reporter를 현재 물리 파라미터의 정답으로 바꾸지 않았습니다.

## 출처와 재현

저자: Marta Urbanska, Maria Winzi, Jochen Guck. 자료: [Mechanomics RT-DC Validation – TGBC CAV1 OE, version 2](https://doi.org/10.6084/m9.figshare.14481432.v2), CC BY 4.0. 원본 자료에서 두 이벤트의 영상·trace를 골라 배열값을 바꾸지 않고 새 배치로 표시했습니다.

`MechVal_OE_TGBC_rtdc.zip`은 1,147,591,864바이트입니다. [공개 다운로드](https://ndownloader.figshare.com/files/27844200)의 `bytes=0-21758620` 부분 응답을 받아 정확한 Content-Range·멤버 이름·압축 방법·크기·CRC를 대조했습니다. 이 부분의 SHA-256은 `ed06fb317df585335e2069e3a9415ac144f70b162164452abb7ab08573eb75a9`, 해제된 RTDC는 `c10602911c16fcdd605407fd91648a2469797c0643aed10ef97f349de5513ce2`입니다. 전체 대용량 ZIP의 MD5를 확인한 것은 아닙니다.

대용량 멤버는 ignored local cache에 두고, 이 문서·해시·요약과 그림을 저장합니다. 동일한 멤버를 확보한 뒤 프로젝트 환경에서 `aleph.outer.parameter_atlas.raw_cytometry_review`에 `--raw`와 `--out` 경로를 주면 재검산할 수 있습니다. source SHA가 다르면 즉시 거부합니다. 외부 분석 소프트웨어를 설치하거나 실행하지 않았으며, h5py로 저장 데이터를 읽고 자체 대조·그림 코드를 실행했습니다.

이 기록은 같은 파일의 수량·처리 계보를 좁힌 결과입니다. 다른 세포주로의 전이, reporter의 절대 단백질 농도, 측정 likelihood, 신경망 성능 향상이나 네이티브 물리 검증은 확립하지 않습니다.
