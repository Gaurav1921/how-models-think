/** App-wide access to glossary term definitions, loaded once and shared. */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getGlossaryTerms } from "./api";
import type { GlossaryTerm } from "./types";

type GlossaryMap = Map<string, GlossaryTerm>;

const GlossaryContext = createContext<GlossaryMap>(new Map());

/** Fetches every glossary term once and makes it available to descendants. */
export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [terms, setTerms] = useState<GlossaryMap>(new Map());

  useEffect(() => {
    let cancelled = false;
    getGlossaryTerms()
      .then((data) => {
        if (!cancelled) setTerms(new Map(data.map((term) => [term.slug, term])));
      })
      .catch(() => {
        /* Term components fall back to plain text when a slug can't be found. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <GlossaryContext.Provider value={terms}>{children}</GlossaryContext.Provider>;
}

/** Looks up a glossary term by slug, or undefined if it hasn't loaded or doesn't exist. */
export function useGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return useContext(GlossaryContext).get(slug);
}
