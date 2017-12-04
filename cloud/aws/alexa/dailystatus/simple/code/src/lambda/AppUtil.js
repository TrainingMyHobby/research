function isProjectIdSpecifiedByUser() {

  if( "UserProjectCode" in this.attributes ) {
    return true;
  }

  return false;
}
