#include "factfut.h"
#include <stdio.h>

int main() {
  struct futhark_context_config *cfg = futhark_context_config_new();
  struct futhark_context *ctx = futhark_context_new(cfg);

  int input = 10;
  int output;
  futhark_entry_main(ctx, &output, input);
  futhark_context_sync(ctx);

  printf("Result: %d\n", output);

  futhark_context_free(ctx);
  futhark_context_config_free(cfg);
}
