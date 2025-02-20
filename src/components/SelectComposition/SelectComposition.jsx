import React  from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Box, Button, Container, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Cancel from "@material-ui/icons/Cancel";
import { useTranslation } from 'react-i18next';
import images from '../../theme/images';
import styles from './SelectComposition.styles';

const useStyles = makeStyles(styles);

export default function SelectComposition({ composition, score, onSelectCompositionClick, onDeselectCompositionClick, onSelectScoreClick, onDeselectScoreClick, onBackButtonClick, onNextButtonClick }) {
  const { t }   = useTranslation('selectComposition');
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img className={classes.person} src={images.personWithBass} alt={t('person')} />
      <Container className={classes.content}>
        <Typography variant="h1" className={classes.header}>{t('title')}</Typography>
        <Box className={classes.part}>
          <Typography variant="body1">{t('start')}</Typography>
          <Box className={classes.inputBox}>
            <div className={classes.selectInput}>
              <Typography className={classNames(classes.selectInputText, { [classes.selectInputTextNoValue]: !composition })} noWrap>
                {composition?.name || t('composition_default')}
              </Typography>
              <div>
                {composition ? (
                  <IconButton onClick={onDeselectCompositionClick} size="small"><Cancel /></IconButton>
                ) : (
                  <Button variant="contained" color="primary" onClick={onSelectCompositionClick}>{t('select')}</Button>
                )}
              </div>
            </div>
          </Box>
          <Typography variant="body2" className={classes.subText}>{t('note_compositions')}</Typography>
        </Box>
        <Box className={classes.part}>
          <Typography variant="body1">{t('score')}</Typography>
          <Box className={classes.inputBox}>
            <div className={classes.selectInput}>
              <Typography className={classNames(classes.selectInputText, { [classes.selectInputTextNoValue]: !score })} noWrap>
                {score?.name || t('score_default')}
              </Typography>
              <div>
                {score ? (
                  <IconButton onClick={onDeselectScoreClick} size="small"><Cancel /></IconButton>
                ) : (
                  <Button variant="contained" color="primary" onClick={onSelectScoreClick} disabled={!composition}>{t('select')}</Button>
                )}
              </div>
            </div>
          </Box>
        </Box>
        <Box className={classes.formNav}>
          <Button onClick={onBackButtonClick}>{t('back')}</Button>
          <Button variant="contained" color="primary" disabled={!(composition && score) } onClick={onNextButtonClick}>{t('next')}</Button>
        </Box>
      </Container>
      <img className={classes.person} src={images.personTrumpetStandingRight} alt={t('person')} />
    </Box>
  );
}

SelectComposition.propTypes = {
  composition               : PropTypes.object,
  score                     : PropTypes.object,
  onSelectCompositionClick  : PropTypes.func,
  onDeselectCompositionClick: PropTypes.func,
  onSelectScoreClick        : PropTypes.func,
  onDeselectScoreClick      : PropTypes.func,
};
