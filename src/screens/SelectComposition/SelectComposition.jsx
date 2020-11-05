import React, { useState } from "react";
import * as PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Box, Button, Container, Dialog, makeStyles, Typography } from "@material-ui/core";
import MultiModalComponent, { SearchConfig, searchTypes } from "trompa-multimodal-component";
import SelectCompositionComponent from "../../components/SelectComposition";
import SelectScoreModal from "../../components/SelectScoreModal";
import styles from './SelectComposition.styles';

const MODAL_NONE  = 0;
const MODAL_COMP  = 1;
const MODAL_SCORE = 2;

const searchConfig = new SearchConfig({
  searchTypes: [searchTypes.MusicComposition],
});

const useStyles = makeStyles(styles);

export default function SelectComposition({ onBackButtonClick, onCompositionSubmit }) {
  const { t }                         = useTranslation('selectComposition');
  const classes                       = useStyles();
  const [composition, setComposition] = useState();
  const [score, setScore]             = useState();
  const [modal, setModal]             = useState(MODAL_NONE);

  const lazyQueryCallback                              = { onCompleted: data => onMMCDataLoaded(data) };
  const [getCompositionWithScores, { loading, error }] = useLazyQuery(GET_COMPOSITION_WITH_SCORES, lazyQueryCallback );

  const loadComposition = node => {
    // Recieve node (composition) from MMC, close Modal, trigger lazyQuery to get additional metadata + scores
    setModal(MODAL_NONE);
    setScore();
    getCompositionWithScores({ variables: { identifier: node.identifier }, onCompleted: data => onMMCDataLoaded(data) });
  };

  const onMMCDataLoaded     = data => {
    setComposition(data.MusicComposition?.[0]);
    //Todo: Get active campaigns of this composition
  };

  const loadScore         = score => {
    setScore(score);
    setModal(MODAL_NONE);
  };
  const onNextButtonClick = () => {
    // console.log('Submit. Composition/score:', composition, score);
    onCompositionSubmit({ composition: composition, score: score });
  };
  
  if (loading) return <Box>{t('loading')}</Box>;
  if (error) console.log('Failed to load scores', error);

  return (
    <Container className={classes.root}>
      <SelectCompositionComponent 
        composition={composition} 
        score={score}
        onSelectComponentClick={() => setModal(MODAL_COMP)} 
        onSelectScoreClick={() => setModal(MODAL_SCORE)}
      />
      <Box className={classes.formNav}>
        <Button onClick={onBackButtonClick}>{t('back')}</Button>
        <Button disabled={!(composition && score) } onClick={onNextButtonClick}>{t('next')}</Button>
      </Box>
      <Dialog
        className={classes.dialog}
        open={modal !== MODAL_NONE} 
        onClose={e => setModal(MODAL_NONE)}
        maxWidth="lg"
        fullWidth
      >
        <Box className={classes.dialogBox}>
          <Typography variant="h2">
            {modal === MODAL_COMP && t('select_composition')}
            {modal === MODAL_SCORE && t('select_score')}
          </Typography>
          <Button className={classes.closeButton} onClick={() => setModal(MODAL_NONE)}>X</Button>
          {modal === MODAL_COMP && (
            <MultiModalComponent 
              config={searchConfig}
              onResultClick={node => loadComposition(node)} 
            />
          )}
          {modal === MODAL_SCORE && (
            <SelectScoreModal 
              composition={composition}
              onLoadScore={node => loadScore(node)} 
            />
          )}
        </Box>
      </Dialog>
    </Container>
  );
}

SelectComposition.propTypes = {
  onBackButtonClick  : PropTypes.func, 
  onCompositionSubmit: PropTypes.func,
};

export const GET_COMPOSITION_WITH_SCORES = gql`
  query GetMusicCompositionWithScores($identifier: ID!){
      MusicComposition(identifier: $identifier) {
      __typename
      identifier
      name
      workExample {
        ... on DigitalDocument {
          identifier
          contributor
          creator
          description
          format
          image
          language
          name
          publisher
          relation
          rights
          source
          subject
          title
        }
      }
    }
  }
`;