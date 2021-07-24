# Wadoku Dict

This project provides a simple dictionary search based on [wadoku.de](https://wadoku.de)
xml data.

Deployment available under [dict.nihongosensei.app](https://dict.nihongosensei.app)

## Schema

The dictionary uses a single table for now which holds the converted xml entry in json
and additional fields ot enable text search.

```sql
CREATE TABLE `entry`
(
    `id`             int unsigned                 NOT NULL,
    `entry_json`     json                                  DEFAULT NULL,
    `lastchange`     timestamp                    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `text_plain`     varchar(255) CHARSET utf8mb4 NULL,
    `hiragana_plain` varchar(255) CHARSET utf8mb4 NULL,
    `orths_plain`    varchar(255) CHARSET utf8mb4 NULL,
    `senses_plain`   text CHARSET utf8mb4         NULL,
    PRIMARY KEY (`id`),
    FULLTEXT KEY `entry_text` (`text_plain`, `hiragana_plain`, `orths_plain`, `senses_plain`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
```

## Import Data

See https://github.com/nihongosensei/wadoku-export-reader

## Wadoku XML Exports

See https://www.wadoku.de/downloads/xml-export/https://www.wadoku.de/downloads/xml-export/

## Wadoku Data License

See https://www.wadoku.de/wiki/display/WAD/Wadoku.de-Daten+Lizenz

## Examples

Multiple Senses: [167612](https://dict.nihongosensei.app/entry/167612)

Def and Text inside a TR: [1707](https://dict.nihongosensei.app/entry/1707)

With a ref inside a Sense: [273](https://dict.nihongosensei.app/entry/273)

Tr followed by a def: [208](https://dict.nihongosensei.app/entry/208)

Tr followed by a def with multiple Tr: [515](https://dict.nihongosensei.app/entry/515)

Multiple defs after a tr: [4029690](https://dict.nihongosensei.app/entry/4029690)

Usg with type and reg: [4151](https://dict.nihongosensei.app/entry/4151)

Long list of senses: [8042046](https://dict.nihongosensei.app/entry/8042046)

With etym: [11712](https://dict.nihongosensei.app/entry/11712)

With etym which has a ref: [8545](https://dict.nihongosensei.app/entry/8545)

With etym which has a foreign word: [490814](https://dict.nihongosensei.app/entry/490814)

With multiple etyms: [2516676](https://dict.nihongosensei.app/entry/2516676)

Usg with type HINT: [3778315](https://dict.nihongosensei.app/entry/3778315)

Usg with type TIME: [8444455](https://dict.nihongosensei.app/entry/8444455)

Def followed by text: [8444455](https://dict.nihongosensei.app/entry/8444455)

Usg on entry level: [5075870](https://dict.nihongosensei.app/entry/5075870)

Famn and title: [226081](https://dict.nihongosensei.app/entry/226081)

Season word: [10000528](https://dict.nihongosensei.app/entry/10000528)

Many senses: [5260527](https://dict.nihongosensei.app/entry/5260527)

Verb with 2 doushi definitions: [2972828](https://dict.nihongosensei.app/entry/2972828)
