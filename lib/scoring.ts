import { APP_CONFIG, ScoringConfig } from "./config";

export interface FightStats {
  won: boolean;
  finishMethod?: "KO_TKO" | "SUBMISSION" | "DECISION_UNANIMOUS" | "DECISION_SPLIT" | "DECISION_MAJORITY";
  finishRound?: number;
  significantStrikes: number;
  takedowns: number;
  knockdowns: number;
  controlTimeSeconds: number;
  opponentRanking?: number;
  fighterRanking?: number;
}

export interface ScoreBreakdown {
  winPoints: number;
  koTkoPoints: number;
  submissionPoints: number;
  strikingPoints: number;
  takedownPoints: number;
  knockdownPoints: number;
  controlTimePoints: number;
  firstRoundBonus: number;
  upsetBonus: number;
  totalPoints: number;
}

export function calculateFantasyScore(
  stats: FightStats,
  config: ScoringConfig = APP_CONFIG.scoring
): ScoreBreakdown {
  const breakdown: ScoreBreakdown = {
    winPoints: 0,
    koTkoPoints: 0,
    submissionPoints: 0,
    strikingPoints: 0,
    takedownPoints: 0,
    knockdownPoints: 0,
    controlTimePoints: 0,
    firstRoundBonus: 0,
    upsetBonus: 0,
    totalPoints: 0,
  };

  if (stats.won) {
    breakdown.winPoints = config.win;

    if (stats.finishMethod === "KO_TKO") {
      breakdown.koTkoPoints = config.koTko;
    } else if (stats.finishMethod === "SUBMISSION") {
      breakdown.submissionPoints = config.submission;
    }

    if (
      stats.finishRound === 1 &&
      (stats.finishMethod === "KO_TKO" || stats.finishMethod === "SUBMISSION")
    ) {
      breakdown.firstRoundBonus = config.firstRoundBonus;
    }

    // Upset bonus: underdog wins (lower ranked beats higher ranked)
    if (
      stats.opponentRanking != null &&
      stats.fighterRanking != null &&
      stats.fighterRanking > stats.opponentRanking
    ) {
      breakdown.upsetBonus = config.upsetBonus;
    }
  }

  breakdown.strikingPoints = stats.significantStrikes * config.significantStrike;
  breakdown.takedownPoints = stats.takedowns * config.takedown;
  breakdown.knockdownPoints = stats.knockdowns * config.knockdown;
  breakdown.controlTimePoints = stats.controlTimeSeconds * config.controlTime;

  breakdown.totalPoints =
    breakdown.winPoints +
    breakdown.koTkoPoints +
    breakdown.submissionPoints +
    breakdown.strikingPoints +
    breakdown.takedownPoints +
    breakdown.knockdownPoints +
    breakdown.controlTimePoints +
    breakdown.firstRoundBonus +
    breakdown.upsetBonus;

  return breakdown;
}
