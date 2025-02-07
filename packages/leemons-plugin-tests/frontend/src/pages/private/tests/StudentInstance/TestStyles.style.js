/* eslint-disable import/prefer-default-export */
import { createStyles, getFontProductive } from '@bubbles-ui/components';

export const TestStyles = createStyles((theme, {}) => ({
  timeLimitContainer: {
    paddingTop: theme.spacing[6],
    width: '100%',
    margin: '0px auto',
    paddingBottom: theme.spacing[5],
  },
  timeLimitContent: {
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[5],
    width: '100%',
    height: 142,
    position: 'relative',
    backgroundImage: 'url(/public/tests/infoBg.jpg)',
    backgroundSize: 'cover',
  },
  timeLimitImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 207,
    height: 184,
  },
  timeLimitInfo: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    transform: 'translateY(-50%)',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    gap: 48,
  },
  howItWorksModalContainer: {
    padding: theme.spacing[2],
    paddingTop: theme.spacing[6],
  },
  tagline: {
    marginBottom: theme.spacing[7],
  },
  resumeBoxContainer: {
    display: 'flex',
    gap: theme.spacing[2],
    justifyContent: 'center',
    marginTop: theme.spacing[2],
    marginBottom: theme.spacing[2],
  },
  resumeBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingLeft: theme.spacing[5],
    paddingRight: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[4],
    backgroundColor: theme.colors.uiBackground02,
  },
  resumeBoxWithBorder: {
    border: `1px solid ${theme.colors.ui01}`,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 16,
    backgroundColor: theme.colors.mainWhite,
  },
  resumeBoxBig: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    textAlign: 'left',
  },
  reverseResumeBoxBig: {
    flexDirection: 'column-reverse',
  },
  resumeNumber: {
    color: theme.colors.text01,
    fontSize: 32,
    textAlign: 'left',
  },
  resumeLabel: {
    ...getFontProductive(),
    color: theme.colors.text01,
    fontSize: theme.fontSizes[1],
    textAlign: 'left',
  },
  weightColorRed: {
    strong: {
      color: theme.colors.fatic01,
      fontWeight: 600,
    },
  },
  weightColorGreen: {
    strong: {
      color: theme.colors.fatic02,
      fontWeight: 600,
    },
  },
  resumeLabelWithBorder: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingBlock: 32,
    paddingLeft: 16,
    borderLeft: `1px solid ${theme.colors.ui01}`,
    marginLeft: 4,
  },
  resumeLabelBig: {
    width: 'calc(100% - 80px)',
    fontSize: theme.fontSizes[2],
    textAlign: 'left',
  },
  questionHeader: {
    backgroundColor: theme.colors.uiBackground01,
    borderRadius: 4,
    width: '100%',
    paddingTop: theme.spacing[2],
    paddingBottom: theme.spacing[2],
    paddingLeft: theme.spacing[4],
    paddingRight: theme.spacing[4],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  questionStep: {
    width: '210px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionStepBar: {
    width: '100%',
    height: '8px',
    backgroundColor: theme.colors.uiBackground02,
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionStepBaInner: {
    height: '8px',
    backgroundColor: theme.colors.mainBlack,
  },
  questionStepNumbers: {
    paddingLeft: theme.spacing[3],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 'none',
  },
  questionValueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 49,
    paddingLeft: theme.spacing[5],
    backgroundColor: theme.colors.ui04,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: theme.spacing[2],
  },
  questionValueCard: {
    backgroundColor: theme.colors.uiBackground02,
    paddingLeft: theme.spacing[4],
    paddingRight: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[3],
    borderRadius: 4,
    marginRight: 2,
    marginLeft: theme.spacing[2],
    height: 45,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  questionCluesCard: {
    backgroundColor: theme.colors.uiBackground01,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  questionClueIcon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  questionCard: {
    width: '100%',
    backgroundColor: theme.colors.uiBackground01,
    padding: theme.spacing[4],
    textAlign: 'left',
    marginBottom: theme.spacing[6],
    borderRadius: 4,
  },
  questionTitle: {
    display: 'flex',
    alignItems: 'top',
    marginBottom: theme.spacing[4],
  },
  questionTitleIcon: {
    display: 'inline-block',
    position: 'relative',
    height: '23px',
    width: '23px',
    marginRight: theme.spacing[3],
    color: theme.colors.text05,
  },
  questionTitleText: {
    width: 'calc(100% - 23px)',
  },
  questionClueCard: {
    width: '100%',
    backgroundImage: 'url(/public/tests/papel-rayas.jpg)',
    backgroundRepeat: 'repeat-y',
    backgroundPosition: 'left center',
    backgroundSize: '100% auto ',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 36,
    paddingBottom: 36,
    position: 'relative',
    borderRadius: 8,
    minHeight: 140,
    marginBottom: theme.spacing[4],
    marginTop: theme.spacing[4],
  },
  questionCluePerson: {
    backgroundImage: 'url(/public/tests/clue-person.png)',
    width: '82px',
    height: '80px',
    backgroundSize: 'cover',
    position: 'absolute',
    right: 56,
    top: 28,
  },
  questionImageContainer: {
    backgroundColor: theme.colors.uiBackground02,
    padding: theme.spacing[4],
    borderRadius: 4,
    marginBottom: theme.spacing[4],
  },
  questionImage: {
    maxWidth: '100%',
    borderRadius: 4,
  },
  questionImageBottomMargin: {
    marginBottom: theme.spacing[4],
  },
  questionResponseImageContainer: {
    border: '1px solid',
    borderColor: theme.colors.ui01,
    borderRadius: 4,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: theme.spacing[3],
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
  },
  questionResponseImageContainerSelected: {
    borderColor: theme.colors.interactive01d,
    backgroundColor: theme.colors.interactive01v1,
  },
  questionResponseImageTextContent: {
    paddingTop: theme.spacing[3],
  },
  questionResponseImageContent: {
    width: '100%',
    position: 'relative',
    paddingBottom: '100%',
  },
  questionResponseImage: {
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    objectFit: 'contain',
  },
  questionResponsesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  },
  questionResponsesContainerImages: {
    display: 'grid',
    flexDirection: 'row',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing[3],
  },
  disableResponseBg: {
    position: 'absolute',
    left: -1,
    top: -1,
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    backgroundColor: theme.colors.uiBackground01,
    zIndex: 1,
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  disableResponseBgWithOutImage: {
    opacity: 0.75,
  },
  disableResponseIcon: {
    width: 22,
    height: 28,
    position: 'absolute',
    right: theme.spacing[3],
    top: theme.spacing[3],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 3,
    zIndex: 2,
  },
  disableResponseIconWithOutImage: {
    top: theme.spacing[1],
    width: 14,
    height: 14,
    right: theme.spacing[1],
    backgroundColor: 'transparent',
  },
  disableResponseImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    zIndex: 3,
  },
  questionResponseImageContainerClued: {
    cursor: 'not-allowed',
  },
  mapImageContainer: {
    marginLeft: -theme.spacing[4],
    marginRight: -theme.spacing[4],
  },
  mapResponsesContainer: {
    marginTop: theme.spacing[4],
    display: 'grid',
    gridTemplateColumns: 'repeat(2, calc(50% - 28px))',
    gridGap: theme.spacing[2],
    columnGap: theme.spacing[6],
  },
  mapResponsesContent: {
    display: 'flex',
    alignItems: 'center',
  },
  mapResponsesNumber: {
    width: '50px',
    textAlign: 'center',
  },
  mapResponsesSelect: {
    width: '100%',
    position: 'relative',
  },
  questionResponseImageContainerDone: {
    borderColor: theme.colors.fatic02,
    backgroundColor: theme.colors.fatic02v0,
  },
  questionResponseImageContainerWrong: {
    borderColor: theme.colors.fatic01,
    backgroundColor: theme.colors.fatic01v0,
  },
  questionViewModeIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 20,
    height: 22,
    zIndex: 2,
  },
  questionResponseImageContainerViewMode: {
    cursor: 'default',
    paddingLeft: 64,
  },
  questionResponseImageContainerViewModeWithImages: {
    paddingLeft: theme.spacing[3],
    flexDirection: 'row',
  },
  mapViewContent: {
    width: '100%',
    padding: theme.spacing[3],
    paddingRight: 32,
    border: '1px solid',
    borderRadius: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    position: 'relative',
  },
  mapViewContentClue: {
    backgroundColor: theme.colors.fatic03v0,
    borderColor: theme.colors.fatic03,
  },
  mapViewContentDone: {
    backgroundColor: theme.colors.fatic02v0,
    borderColor: theme.colors.fatic02,
  },
  mapViewContentError: {
    backgroundColor: theme.colors.fatic01v0,
    borderColor: theme.colors.fatic01,
  },
  mapViewIcon: {
    position: 'absolute',
    right: theme.spacing[3],
    width: 16,
    height: 24,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  countdownContainer: {
    backgroundColor: theme.colors.uiBackground02,
    width: 210,
    height: 60,
    borderRadius: theme.spacing[2],
    marginBottom: theme.spacing[3],
  },
  textExplanation: {
    border: '2px solid',
    borderColor: theme.colors.interactive03h,
    backgroundColor: theme.colors.uiBackground04,
    borderRadius: theme.spacing[1],
    padding: theme.spacing[4],
    marginTop: theme.spacing[5],
    marginLeft: -52,
  },
  textExplanationRemovePadding: {
    marginLeft: 0,
  },
  questionResponseRemovePadding: {
    paddingLeft: theme.spacing[4],
  },
  questionResponsesContainerViewMode: {
    gridTemplateColumns: 'repeat(1, auto)',
  },
  questionResponseImageContentViewMode: {
    width: 150,
    height: 150,
    position: 'relative',
    marginRight: theme.spacing[4],
  },
  questionResponseImageTextContentViewMode: {
    width: '80%',
  },
  textExplanationViewMode: {
    marginLeft: '0px !important',
    marginTop: 0,
  },
  returnToTable: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  questionTitleEmbedded: {
    position: 'relative',
    marginLeft: -theme.spacing[4],
    marginRight: -theme.spacing[4],
    marginTop: -theme.spacing[4],
    padding: theme.spacing[4],
    backgroundColor: theme.colors.ui04,
    paddingRight: '200px',
  },
  questionValueCardEmbedded: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 0,
    borderRadius: '2px 0 2px 2px',
  },
}));
